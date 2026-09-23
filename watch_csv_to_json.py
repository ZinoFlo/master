#!/usr/bin/env python3
"""Watch a directory and convert newly-written CSV files to formatted JSON."""

from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import sys
import tempfile
import time
from collections import Counter
from pathlib import Path
from typing import Iterable


def unique_headers(headers: Iterable[str | None]) -> list[str]:
    """Return non-empty, unique field names while preserving their order."""
    counts: Counter[str] = Counter()
    result: list[str] = []
    for header in headers:
        name = (header or "").strip() or "column"
        counts[name] += 1
        result.append(name if counts[name] == 1 else f"{name}_{counts[name] - 1}")
    return result


def is_stable(path: Path, wait: float) -> bool:
    """Avoid reading a file while another process is still writing it."""
    try:
        first = path.stat()
        time.sleep(wait)
        second = path.stat()
    except FileNotFoundError:
        return False
    return first.st_size == second.st_size and first.st_mtime_ns == second.st_mtime_ns


def write_json_atomically(path: Path, data: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary_name: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            "w", encoding="utf-8", dir=path.parent, suffix=".tmp", delete=False
        ) as temporary:
            json.dump(data, temporary, ensure_ascii=False, indent=2)
            temporary.write("\n")
            temporary.flush()
            os.fsync(temporary.fileno())
            temporary_name = Path(temporary.name)
        os.replace(temporary_name, path)
        temporary_name = None
    finally:
        if temporary_name is not None:
            temporary_name.unlink(missing_ok=True)


def convert_csv(csv_path: Path, json_path: Path) -> None:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as source:
        sample = source.read(8192)
        source.seek(0)
        reader = csv.reader(source)
        try:
            first_row = next(reader)
        except StopIteration:
            write_json_atomically(json_path, [])
            return

        try:
            has_header = csv.Sniffer().has_header(sample)
        except csv.Error:
            has_header = False

        if has_header:
            headers = unique_headers(first_row)
            rows = reader
        else:
            headers = [f"column_{index}" for index in range(1, len(first_row) + 1)]
            rows = iter([first_row, *reader])

        data: list[dict[str, str]] = []
        for row in rows:
            values = list(row[: len(headers)])
            values.extend([""] * (len(headers) - len(values)))
            data.append(dict(zip(headers, values)))

    write_json_atomically(json_path, data)


def configure_logging(log_path: Path) -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s: %(message)s",
        handlers=[
            logging.FileHandler(log_path, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )


def watch(input_dir: Path, output_dir: Path, interval: float) -> None:
    configure_logging(output_dir / "conversion.log")
    logging.info("Watching %s -> %s every %s seconds", input_dir, output_dir, interval)
    try:
        while True:
            for csv_path in sorted(input_dir.iterdir()):
                if not csv_path.is_file() or csv_path.suffix.lower() != ".csv":
                    continue
                json_path = output_dir / f"{csv_path.stem}.json"
                try:
                    if json_path.exists() and json_path.stat().st_mtime_ns >= csv_path.stat().st_mtime_ns:
                        continue
                    if not is_stable(csv_path, min(1.0, interval)):
                        logging.info("Skipping %s because it is still being written", csv_path.name)
                        continue
                    convert_csv(csv_path, json_path)
                    logging.info("Converted %s -> %s", csv_path.name, json_path.name)
                except (OSError, csv.Error, UnicodeError, ValueError):
                    logging.exception("Failed to convert %s", csv_path)
            time.sleep(interval)
    except KeyboardInterrupt:
        logging.info("Watcher stopped")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Watch a folder and convert CSV files to formatted JSON."
    )
    parser.add_argument("input_dir", type=Path, help="Directory containing CSV files")
    parser.add_argument("output_dir", type=Path, help="Directory for JSON files and conversion.log")
    parser.add_argument("--interval", type=float, default=5.0, help="Polling interval in seconds")
    args = parser.parse_args()
    if args.interval <= 0:
        parser.error("--interval must be greater than zero")
    return args


def main() -> int:
    args = parse_args()
    input_dir = args.input_dir.expanduser().resolve()
    output_dir = args.output_dir.expanduser().resolve()
    if not input_dir.is_dir():
        print(f"Input directory does not exist or is not a directory: {input_dir}", file=sys.stderr)
        return 1
    output_dir.mkdir(parents=True, exist_ok=True)
    watch(input_dir, output_dir, args.interval)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
