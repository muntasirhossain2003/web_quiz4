import { makeRequest } from './api';

export const registerUser = (userData) => {
  return makeRequest('POST', '/users/register', userData);
};

export const loginUser = (credentials) => {
  return makeRequest('POST', '/users/login', credentials);
};
