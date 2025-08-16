import { describe, it, expect, vi } from 'vitest';
import { apiRequest } from '../services/ApiRequest';

// Mock fetch globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

describe('apiRequest', () => {
  it('returns data when response is ok', async () => {
    const data = await apiRequest('/test');
    expect(data).toEqual({ success: true });
  });

  it('throws error when response is not ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () =>
          Promise.resolve({
            timestamp: '2025-08-15T00:00:00Z',
            status: 404,
            error: 'Not Found',
            message: 'Resource not found',
          }),
      })
    );
    await expect(apiRequest('/bad')).rejects.toMatchObject({
      status: 404,
      error: 'Not Found',
      message: 'Resource not found',
    });
  });
});