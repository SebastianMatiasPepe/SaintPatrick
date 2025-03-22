import api from './api';

export const cardService = {
  getCards: async () => {
    try {
      const response = await api.get('/tarjetas');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCardByNumber: async (cardNumber) => {
    try {
      const response = await api.get(`/tarjetas/${cardNumber}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createCard: async (cardData) => {
    try {
      const response = await api.post('/tarjetas', cardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};