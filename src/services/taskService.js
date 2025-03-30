import { makeRequest } from './api';

export const getTasks = () => {
  return makeRequest('GET', '/tasks');
};

export const createTask = (taskData) => {
  return makeRequest('POST', '/tasks', taskData);
};

export const updateTask = (taskId, taskData) => {
  return makeRequest('PUT', `/tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
  return makeRequest('DELETE', `/tasks/${taskId}`);
};

