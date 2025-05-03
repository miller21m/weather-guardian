const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// Centralized API utility for making HTTP requests
export const api = {

  // Generic request method used internally by all other HTTP methods
  async request(endpoint, method = 'GET', data = null) {
    const token = localStorage.getItem('token');// Get JWT token from local storage

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})// Attach auth header if token exists
    };

    const options = {
      method,
      headers,
      ...(data ? { body: JSON.stringify(data) } : {})// Add body for POST/PUT
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    // Attempt to parse JSON response; fall back to empty object if parsing fails
    const responseData = await response.json().catch(() => ({}));

    // Throw a custom error if response is not ok
    if (!response.ok) {
      const error = new Error(responseData.message || 'API error');
      error.status = response.status;
      throw error;
    }
    return responseData;
  },

  // Helper methods for each HTTP verb
  get(endpoint){ 
    return this.request(endpoint, 'GET'); 
  },
  post(endpoint, data){
    return this.request(endpoint, 'POST', data); 
  },
  put(endpoint, data){
    return this.request(endpoint, 'PUT', data); 
  },
  delete(endpoint){ 
    return this.request(endpoint, 'DELETE'); 
  }
};