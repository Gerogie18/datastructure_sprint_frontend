import { http, HttpResponse } from 'msw';

// Helper function to build a BST from an array of numbers
const buildTree = (numbers) => {
  if (!numbers || numbers.length === 0) {
    return null;
  }

  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const insert = (node, value) => {
    if (node === null) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = insert(node.left, value);
    } else {
      node.right = insert(node.right, value);
    }

    return node;
  };

  let root = null;
  numbers.forEach(value => {
    root = insert(root, value);
  });

  return root;
};

// Mock data with varied trees
let trees = [
  // User 1 (Susan) - Mostly balanced trees
  { id: 1, userId: 1, inputNumbers: '10, 5, 15, 3, 7, 12, 18', jsonTree: JSON.stringify(buildTree([10, 5, 15, 3, 7, 12, 18]), null, 2) },
  { id: 2, userId: 1, inputNumbers: '20, 10, 30', jsonTree: JSON.stringify(buildTree([20, 10, 30]), null, 2) },

  // User 2 (RiffRaff) - Unbalanced trees
  { id: 3, userId: 2, inputNumbers: '1, 2, 3, 4, 5', jsonTree: JSON.stringify(buildTree([1, 2, 3, 4, 5]), null, 2) },
  { id: 4, userId: 2, inputNumbers: '10, 9, 8, 7', jsonTree: JSON.stringify(buildTree([10, 9, 8, 7]), null, 2) },

  // User 3 (Magenta) - Trees with only left or right children
  { id: 5, userId: 3, inputNumbers: '50, 40, 30, 20', jsonTree: JSON.stringify(buildTree([50, 40, 30, 20]), null, 2) },
  { id: 6, userId: 3, inputNumbers: '5, 10, 15, 20', jsonTree: JSON.stringify(buildTree([5, 10, 15, 20]), null, 2) },

  // User 4 (Frank-N-Furter) - A mix of trees, including a larger one
  { id: 7, userId: 4, inputNumbers: '8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15', jsonTree: JSON.stringify(buildTree([8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]), null, 2) },
  { id: 8, userId: 4, inputNumbers: '100, 50, 150', jsonTree: JSON.stringify(buildTree([100, 50, 150]), null, 2) },
  { id: 9, userId: 4, inputNumbers: '5, 4, 3, 2, 1', jsonTree: JSON.stringify(buildTree([5, 4, 3, 2, 1]), null, 2) }
];

let users = [
  { id: 1, name: 'Susan' },
  { id: 2, name: 'RiffRaff' },
  { id: 3, name: 'Magenta' },
  { id: 4, name: 'Frank-N-Furter' },
];

const handlers = [
  // GET /api/trees - all trees
  http.get('/api/trees', () => {
    return HttpResponse.json(trees);
  }),

  // GET /api/trees/user/:userId - trees for a user
  http.get('/api/trees/user/:userId', ({ params }) => {
    const userId = Number(params.userId);
    const userTrees = trees.filter(tree => tree.userId === userId);
    return HttpResponse.json(userTrees);
  }),

  // GET /api/trees/all - all trees (alias)
  http.get('/api/trees/all', () => {
    return HttpResponse.json(trees);
  }),

  // POST /api/trees - create a new tree
  http.post('/api/trees', async ({ request }) => {
    const { numbers, userId } = await request.json();
    
    // 1. Build the tree structure from the numbers
    const treeStructure = buildTree(numbers);
    
    // 2. Serialize the tree to a JSON string
    const jsonTree = JSON.stringify(treeStructure, null, 2);
    
    // 3. Create the new tree object for storage
    const newId = trees.length ? Math.max(...trees.map(t => t.id)) + 1 : 1;
    const inputNumbers = Array.isArray(numbers) ? numbers.join(', ') : String(numbers);
    
    const newTree = {
      id: newId,
      userId,
      inputNumbers,
      jsonTree,
    };
    
    // 4. Add the new tree to our mock database
    trees.push(newTree);
    
    // 5. Return the newly created tree object
    return HttpResponse.json(newTree, { status: 201 });
  }),

  // GET /api/users - all users
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  // POST /api/users - create a new user
  http.post('/api/users', async ({ request }) => {
    const { name } = await request.json();
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, name };
    users.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  })
];
export { handlers };
