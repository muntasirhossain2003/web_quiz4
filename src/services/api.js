import axios from 'axios';

// Update the API URL to point to your backend (port 5001)
const API_URL = 'http://localhost:5001/api'; // Change port to 5001

// Function to make API requests
export const makeRequest = async (method, url, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('API Error:', error);
    return null; // Return null if an error occurs
  }
};
