// Create or update the transferService.js file
export const transferService = {
  getTransferHistory: async (userId) => {
    try {
      // This will be replaced with actual API call when available
      // For now, we'll return an empty array
      return [];
    } catch (error) {
      console.error("Transfer service error:", error);
      throw error;
    }
  },
  
  transferBetweenAccounts: async (transferData) => {
    try {
      const response = await fetch('https://apibanktest.onrender.com/transaccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numeroTarjetaOrigen: transferData.fromCardNumber,
          numeroTarjetaDestino: transferData.toCardNumber,
          monto: transferData.amount
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Failed to complete transfer');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Transfer service error:", error);
      throw error;
    }
  },
  
  getCardOwner: async (cardNumber) => {
    try {
      const response = await fetch(`https://apibanktest.onrender.com/tarjetas/${cardNumber}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching card owner: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching card owner:", error);
      throw error;
    }
  }
};