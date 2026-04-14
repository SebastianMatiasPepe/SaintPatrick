import api from './api';

export const transactionService = {
  getTransactions: async () => {
    try {
      const response = await api.get('/transaccion');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getTransactionsByAccountId: async (accountId) => {
    try {
      // Get the logged-in user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id; // Get the user ID
      
      // If accountId is not provided, use the logged-in user's ID
      const idToUse = accountId || userId;
      
      if (!idToUse) {
        throw new Error('No account ID or logged-in user ID available');
      }
      console.log(user);
      
      const response = await api.get(`/cuenta/${idToUse}/transacciones`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createTransaction: async (transactionData) => {
    try {
      const response = await api.post('/transaccion', transactionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};