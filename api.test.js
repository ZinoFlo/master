const { getAuthToken, fetchSources } = require('./index-test-wrapper.js');

describe('Jules API Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    global.Office = {
      auth: {
        getAccessToken: jest.fn()
      }
    };
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    };
  });

  test('getAuthToken calls Office.auth.getAccessToken', async () => {
    global.Office.auth.getAccessToken.mockResolvedValue('fake-token');
    const token = await getAuthToken();
    expect(token).toBe('fake-token');
    expect(global.Office.auth.getAccessToken).toHaveBeenCalled();
  });

  test('fetchSources calls fetch with correct headers', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ sources: ['source1'] })
    });

    const data = await fetchSources('fake-token');
    expect(data.sources).toContain('source1');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jules.googleapis.com/v1alpha/sources',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer fake-token'
        })
      })
    );
  });
});
