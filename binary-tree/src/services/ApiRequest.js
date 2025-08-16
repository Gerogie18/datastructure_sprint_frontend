const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Try to parse JSON (even for errors)
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Map backend error structure
      const error = {
        timestamp: data?.timestamp,
        status: data?.status || response.status,
        error: data?.error || response.statusText,
        message: data?.message || 'An error occurred',
      };
      throw error;
    }

    return data;
  } catch (err) {
    // If err is not our error object, wrap it
    if (err.status) throw err;
    throw {
      timestamp: new Date().toISOString(),
      status: 0,
      error: 'Network Error',
      message: err.message || 'Unable to connect to the server',
    };
  }
}
