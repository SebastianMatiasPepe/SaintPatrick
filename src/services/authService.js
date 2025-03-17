import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/userLog', credentials);
      // Store all parts of the token
      if (response.data.Sha1 && response.data.Sha2 && response.data.Sha3) {
        // Store the payload part (Sha2) as the main token
        localStorage.setItem('token', response.data.Sha2);
        
        // Also store the complete token for API calls
        const fullToken = `${response.data.Sha1}.${response.data.Sha2}.${response.data.Sha3}`;
        localStorage.setItem('fullToken', fullToken);
        
        // Decode and store user info
        try {
          const base64 = response.data.Sha2.replace(/-/g, '+').replace(/_/g, '/');
          const userInfo = JSON.parse(window.atob(base64));
          localStorage.setItem('user', JSON.stringify(userInfo));
        } catch (e) {
          console.error('Error parsing user info from token', e);
          localStorage.setItem('user', JSON.stringify({ 
            message: response.data.mensaje 
          }));
        }
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) return user;
    
    // If user object doesn't exist, try to decode from token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Split the token and get the payload part (second part)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decode the base64 string
        const decodedToken = JSON.parse(window.atob(base64));
        return decodedToken;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  },
  
  getUserId: () => {
    const user = authService.getCurrentUser();
    return user?.id;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};