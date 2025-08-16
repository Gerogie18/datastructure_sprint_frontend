import { rest } from 'msw';

// Mock data migrated from db.json
let trees = [
  { id: 1, inputNumbers: '1, 2, 3', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : null\n    }\n  }\n}', userId: 1 },
  { id: 2, inputNumbers: '1, 2, 3, 4', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 1 },
  { id: 3, inputNumbers: '1, 2, 3, 4, 5', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : null\n        }\n      }\n    }\n  }\n}', userId: 1 },
  { id: 4, inputNumbers: '1, 2, 3, 4, 5, 6', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : {\n            "value" : 6,\n            "left" : null,\n            "right" : null\n          }\n        }\n      }\n    }\n  }\n}', userId: 1 },
  { id: 5, inputNumbers: '8, 4, 2, 1, 3, 6, 5, 7, 12, 10, 9, 11, 14, 13, 15', jsonTree: '{\n  "value" : 8,\n  "left" : {\n    "value" : 4,\n    "left" : {\n      "value" : 2,\n      "left" : {\n        "value" : 1,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 3,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 6,\n      "left" : {\n        "value" : 5,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 7,\n        "left" : null,\n        "right" : null\n      }\n    }\n  },\n  "right" : {\n    "value" : 12,\n    "left" : {\n      "value" : 10,\n      "left" : {\n        "value" : 9,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 11,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 14,\n      "left" : {\n        "value" : 13,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 15,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 1 },
  // ... (remaining tree records for userId 2, 3, 4)
  { id: 6, inputNumbers: '1, 2, 3', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : null\n    }\n  }\n}', userId: 2 },
  { id: 7, inputNumbers: '1, 2, 3, 4', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 2 },
  { id: 8, inputNumbers: '1, 2, 3, 4, 5', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : null\n        }\n      }\n    }\n  }\n}', userId: 2 },
  { id: 9, inputNumbers: '1, 2, 3, 4, 5, 6', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : {\n            "value" : 6,\n            "left" : null,\n            "right" : null\n          }\n        }\n      }\n    }\n  }\n}', userId: 2 },
  { id: 10, inputNumbers: '8, 4, 2, 1, 3, 6, 5, 7, 12, 10, 9, 11, 14, 13, 15', jsonTree: '{\n  "value" : 8,\n  "left" : {\n    "value" : 4,\n    "left" : {\n      "value" : 2,\n      "left" : {\n        "value" : 1,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 3,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 6,\n      "left" : {\n        "value" : 5,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 7,\n        "left" : null,\n        "right" : null\n      }\n    }\n  },\n  "right" : {\n    "value" : 12,\n    "left" : {\n      "value" : 10,\n      "left" : {\n        "value" : 9,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 11,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 14,\n      "left" : {\n        "value" : 13,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 15,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 2 },
  // ... (repeat for userId 3, 4)
  { id: 11, inputNumbers: '1, 2, 3', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : null\n    }\n  }\n}', userId: 3 },
  { id: 12, inputNumbers: '1, 2, 3, 4', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 3 },
  { id: 13, inputNumbers: '1, 2, 3, 4, 5', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : null\n        }\n      }\n    }\n  }\n}', userId: 3 },
  { id: 14, inputNumbers: '1, 2, 3, 4, 5, 6', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : {\n            "value" : 6,\n            "left" : null,\n            "right" : null\n          }\n        }\n      }\n    }\n  }\n}', userId: 3 },
  { id: 15, inputNumbers: '8, 4, 2, 1, 3, 6, 5, 7, 12, 10, 9, 11, 14, 13, 15', jsonTree: '{\n  "value" : 8,\n  "left" : {\n    "value" : 4,\n    "left" : {\n      "value" : 2,\n      "left" : {\n        "value" : 1,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 3,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 6,\n      "left" : {\n        "value" : 5,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 7,\n        "left" : null,\n        "right" : null\n      }\n    }\n  },\n  "right" : {\n    "value" : 12,\n    "left" : {\n      "value" : 10,\n      "left" : {\n        "value" : 9,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 11,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 14,\n      "left" : {\n        "value" : 13,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 15,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 3 },
  { id: 16, inputNumbers: '1, 2, 3', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : null\n    }\n  }\n}', userId: 4 },
  { id: 17, inputNumbers: '1, 2, 3, 4', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 4 },
  { id: 18, inputNumbers: '1, 2, 3, 4, 5', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : null\n        }\n      }\n    }\n  }\n}', userId: 4 },
  { id: 19, inputNumbers: '1, 2, 3, 4, 5, 6', jsonTree: '{\n  "value" : 1,\n  "left" : null,\n  "right" : {\n    "value" : 2,\n    "left" : null,\n    "right" : {\n      "value" : 3,\n      "left" : null,\n      "right" : {\n        "value" : 4,\n        "left" : null,\n        "right" : {\n          "value" : 5,\n          "left" : null,\n          "right" : {\n            "value" : 6,\n            "left" : null,\n            "right" : null\n          }\n        }\n      }\n    }\n  }\n}', userId: 4 },
  { id: 20, inputNumbers: '8, 4, 2, 1, 3, 6, 5, 7, 12, 10, 9, 11, 14, 13, 15', jsonTree: '{\n  "value" : 8,\n  "left" : {\n    "value" : 4,\n    "left" : {\n      "value" : 2,\n      "left" : {\n        "value" : 1,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 3,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 6,\n      "left" : {\n        "value" : 5,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 7,\n        "left" : null,\n        "right" : null\n      }\n    }\n  },\n  "right" : {\n    "value" : 12,\n    "left" : {\n      "value" : 10,\n      "left" : {\n        "value" : 9,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 11,\n        "left" : null,\n        "right" : null\n      }\n    },\n    "right" : {\n      "value" : 14,\n      "left" : {\n        "value" : 13,\n        "left" : null,\n        "right" : null\n      },\n      "right" : {\n        "value" : 15,\n        "left" : null,\n        "right" : null\n      }\n    }\n  }\n}', userId: 4 },
];

let users = [
  { id: 1, name: 'Susan' },
  { id: 2, name: 'RiffRaff' },
  { id: 3, name: 'Magenta' },
  { id: 4, name: 'Frank-N-Furter' },
];

export const handlers = [
  // GET /api/trees - all trees
  rest.get('/api/trees', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(trees));
  }),

  // GET /api/trees/user/:userId - trees for a user
  rest.get('/api/trees/user/:userId', (req, res, ctx) => {
    const userId = Number(req.params.userId);
    const userTrees = trees.filter(tree => tree.userId === userId);
    return res(ctx.status(200), ctx.json(userTrees));
  }),

  // GET /api/trees/all - all trees (alias)
  rest.get('/api/trees/all', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(trees));
  }),

  // POST /api/trees - create a new tree
  rest.post('/api/trees', async (req, res, ctx) => {
    const { numbers, userId } = await req.json();
    const newId = trees.length ? Math.max(...trees.map(t => t.id)) + 1 : 1;
    const inputNumbers = Array.isArray(numbers) ? numbers.join(', ') : String(numbers);
    const newTree = {
      id: newId,
      inputNumbers,
      jsonTree: '{}', // You can enhance this to build a real tree if needed
      userId,
    };
    trees.push(newTree);
    return res(ctx.status(201), ctx.json(newTree));
  }),

  // GET /api/users - all users
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),

  // POST /api/users - create a new user
  rest.post('/api/users', async (req, res, ctx) => {
    const { name } = await req.json();
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, name };
    users.push(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
];
