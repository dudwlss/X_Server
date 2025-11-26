const BASE_URL = 'http://localhost:8080';

class API {
  static getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  static async request(endpoint, method = 'GET', body = null) {
    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/client/index.html';
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Something went wrong' }));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      if (response.status === 204) return null; // No content

      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  }

  static async login(userid, password) {
    return this.request('/auth/login', 'POST', { userid, password });
  }

  static async signup(userid, password, name, email, url) {
    return this.request('/auth/signup', 'POST', { userid, password, name, email, url });
  }

  static async getPosts(username) {
    const query = username ? `?userid=${username}` : '';
    return this.request(`/post${query}`, 'GET');
  }

  static async getPost(id) {
    return this.request(`/post/${id}`, 'GET');
  }

  static async createPost(text) {
    return this.request('/post', 'POST', { text });
  }

  static async updatePost(id, text) {
    return this.request(`/post/${id}`, 'PUT', { text });
  }

  static async deletePost(id) {
    return this.request(`/post/${id}`, 'DELETE');
  }
  
  static async me() {
      return this.request('/auth/me', 'GET');
  }
}
