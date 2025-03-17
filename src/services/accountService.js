import api from './api';

export const accountService = {
  getAccounts: async () => {
    try {
      const response = await api.get('/cuenta');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getAccountById: async (id) => {
    try {
      const response = await api.get(`/cuenta/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createAccount: async (accountData) => {
    try {
      const response = await api.post('/cuenta', accountData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};