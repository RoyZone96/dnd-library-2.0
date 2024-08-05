import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const getUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/user/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
    return null;
  }
};

// New function to fetch user ID by username
const getUserIdByUsername = async (username) => {
  try {
    const response = await axios.get(`http://localhost:8080/user/username/${username}`);
    return response.data.user_id; // Assuming the response contains the user ID in a property named user_id
  } catch (error) {
    console.error(`Error fetching user ID by username: ${error}`);
    return null;
  }
};

const UserAuthService = {
  async getUserIdFromToken() {
    try {
      const token = localStorage.getItem('token');
      console.log(`Token: ${token}`);
      if (!token) {
        console.error('No token found. Please log in.');
        return null;
      }

      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken.sub) {
        console.error('Invalid token. Please log in again.');
        return null;
      }
      return decodedToken.sub;
    } catch (error) {
      console.error(`Error decoding token: ${error}`);
      return null;
    }
  },

  async getUserData() {
    const user_id = await this.getUserIdFromToken();

    // Log the obtained user ID
    console.log(`Obtained User ID: ${user_id}`);

    if (user_id) {
      const userData = await getUserById(user_id);
      console.log(`User data for ID ${user_id}:`, userData); // Log the user data obtained with the user ID
      return userData;
    } else {
      console.error('Unable to retrieve user ID from token.');
      return null;
    }
  },

  // Expose the new method to fetch user ID by username
  getUserIdByUsername,
};

export default UserAuthService;

