import { rest } from 'msw';

export const handlers = [
  // Example: Mock GET /api/trees
  rest.get('/api/trees', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        // Add your mock tree data here
        { id: 1, inputNumbers: '1, 2, 3', userId: 1 },
        { id: 2, inputNumbers: '1, 2, 3, 4', userId: 1 },
      ])
    );
  }),
  // Add more handlers for other endpoints as needed
];
