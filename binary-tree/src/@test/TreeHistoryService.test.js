import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTree, getTreesForUser, getAllTrees } from '../services/TreeHistoryService';
import { apiRequest } from '../services/ApiRequest';

// Mock the apiRequest function
vi.mock('../services/ApiRequest', () => ({
  apiRequest: vi.fn(),
}));

describe('TreeHistoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTree', () => {
    it('calls apiRequest with correct parameters', async () => {
      const mockTreeRecord = { 
        id: 1, 
        inputNumbers: '1, 2, 3', 
        jsonTree: '{"value":1,"left":null,"right":{"value":2,"left":null,"right":{"value":3,"left":null,"right":null}}}',
        userId: 1 
      };
      apiRequest.mockResolvedValue(mockTreeRecord);

      const result = await createTree([1, 2, 3], 1);

      expect(apiRequest).toHaveBeenCalledWith('/trees', {
        method: 'POST',
        body: JSON.stringify({ numbers: [1, 2, 3], userId: 1 }),
      });
      expect(result).toEqual(mockTreeRecord);
    });
  });

  describe('getTreesForUser', () => {
    it('calls apiRequest with correct endpoint and userId', async () => {
      const mockTrees = [
        { id: 1, inputNumbers: '1, 2, 3', userId: 1 },
        { id: 2, inputNumbers: '4, 5, 6', userId: 1 },
      ];
      apiRequest.mockResolvedValue(mockTrees);

      const result = await getTreesForUser(1);

      expect(apiRequest).toHaveBeenCalledWith('/trees/user/1');
      expect(result).toEqual(mockTrees);
    });
  });

  describe('getAllTrees', () => {
    it('calls apiRequest with correct endpoint', async () => {
      const mockTrees = [
        { id: 1, inputNumbers: '1, 2, 3', userId: 1 },
        { id: 2, inputNumbers: '4, 5, 6', userId: 2 },
        { id: 3, inputNumbers: '7, 8, 9', userId: 1 },
      ];
      apiRequest.mockResolvedValue(mockTrees);

      const result = await getAllTrees();

      expect(apiRequest).toHaveBeenCalledWith('/trees/all');
      expect(result).toEqual(mockTrees);
    });
  });
});
