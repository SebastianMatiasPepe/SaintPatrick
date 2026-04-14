export const userService = {
  getUserById: async (userId) => {
    try {
      const response = await fetch(`https://apibanktest.onrender.com/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("User service error:", error);
      throw error;
    }
  },
  // Add this method to your existing userService
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/usuarios/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};