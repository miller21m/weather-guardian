const API_BASE_URL = 'http://localhost:3000';

export const api = {
  async request(endpoint, method = 'GET', data = null) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
    const options = {
      method,
      headers,
      ...(data ? { body: JSON.stringify(data) } : {})
    };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const responseData = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(responseData.message || 'API error');
      error.status = response.status;
      throw error;
    }
    return responseData;
  },
  get(endpoint) { return this.request(endpoint, 'GET'); },
  post(endpoint, data) { return this.request(endpoint, 'POST', data); },
  put(endpoint, data) { return this.request(endpoint, 'PUT', data); },
  delete(endpoint) { return this.request(endpoint, 'DELETE'); }
};