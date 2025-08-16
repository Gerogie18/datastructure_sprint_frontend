import { apiRequest } from './ApiRequest';

// Endpoint from your Spring Boot controller
const TREES_ENDPOINT = '/trees';

/**
 * Creates a new binary tree for a user.
 * @param {object} treeRequest - The request object containing userId and numbers.
 * @param {number} treeRequest.userId - The ID of the user.
 * @param {number[]} treeRequest.numbers - The list of numbers to build the tree from.
 * @returns {Promise<object>} The created tree record.
 */
export const createTree = (treeRequest) => {
  return apiRequest(TREES_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(treeRequest),
  });
};

/**
 * Retrieves all tree records for a specific user.
 * @param {number} userId - The ID of the user.
 *
 * @returns {Promise<object[]>} A list of tree records.
 */
export const getTreesForUser = (userId) => {
  return apiRequest(`${TREES_ENDPOINT}/user/${userId}`);
};

/**
 * Retrieves all tree records from all users.
 * @returns {Promise<object[]>} A list of all tree records.
 */
export const getAllTrees = () => {
  return apiRequest(`${TREES_ENDPOINT}/all`);
};