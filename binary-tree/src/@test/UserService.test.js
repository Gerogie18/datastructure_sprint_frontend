import { describe, it, expect, vi } from 'vitest';
import { createUser, getAllUsers } from '../services/UserService';
import { apiRequest } from '../services/ApiRequest';

// Mock the apiRequest function
vi.mock('../services/ApiRequest', () => ({
  apiRequest: vi.fn(),
}));

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    it('calls apiRequest with correct parameters', async () => {
      const mockUser = { id: 1, name: 'John Doe' };
      apiRequest.mockResolvedValue(mockUser);

      const result = await createUser('John Doe');

      expect(apiRequest).toHaveBeenCalledWith('/users', {
        method: 'POST',
        body: JSON.stringify({ name: 'John Doe' }),
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('calls apiRequest with correct endpoint', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
      apiRequest.mockResolvedValue(mockUsers);

      const result = await getAllUsers();

      expect(apiRequest).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockUsers);
    });
  });
});
