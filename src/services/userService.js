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
  }
};