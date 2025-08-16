import { apiRequest } from './ApiRequest';

// Endpoint from your Spring Boot controller
const USERS_ENDPOINT = '/users';

/**
 * Creates a new user.
 * @param {string} name - The name of the user.
 * @returns {Promise<object>} The created user.
 */
export const createUser = (name) => {
  return apiRequest(USERS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
};

/**
 * Retrieves all users.
 * @returns {Promise<object[]>} A list of all users.
 */
export const getAllUsers = () => {
  return apiRequest(USERS_ENDPOINT);
};