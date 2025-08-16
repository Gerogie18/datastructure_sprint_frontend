import React from 'react';
import PropTypes from 'prop-types';
import './BinaryTreeDiv.css';

// Helper function to calculate the height of a node
const getHeight = (node) => {
  if (!node) {
    return 0;
  }
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
};

// Helper function to check if the tree is balanced
const isBalanced = (node) => {
  if (!node) {
    return true;
  }
  const leftHeight = getHeight(node.left);
  const rightHeight = getHeight(node.right);

  if (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalanced(node.left) &&
    isBalanced(node.right)
  ) {
    return true;
  }
  return false;
};

const TreeNode = ({ node }) => {
  if (!node) {
    return null;
  }

  const isLeaf = !node.left && !node.right;
  const nodeClassName = `tree-node ${isLeaf ? 'leaf' : ''}`;

  return (
    <div className="node-container">
      <div className={nodeClassName}>
        <div className="node-value">{node.value}</div>
      </div>
      {(node.left || node.right) && (
        <div className="children">
          {node.left && (
            <div className="node-branch">
              <TreeNode node={node.left} />
            </div>
          )}
          {node.right && (
            <div className="node-branch">
              <TreeNode node={node.right} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TreeNode.propTypes = {
    node: PropTypes.shape({
        value: PropTypes.any.isRequired,
        left: PropTypes.object,
        right: PropTypes.object,
    }),
};


const BinaryTreeDiv = ({ jsonTree }) => {
  let treeData;
  try {
    // Safely parse the JSON string
    treeData = typeof jsonTree === 'string' ? JSON.parse(jsonTree) : jsonTree;
  } catch (error) {
    console.error("Invalid JSON for tree:", error);
    return <div className="tree-error">Invalid Tree Data</div>;
  }

  if (!treeData) {
    return null;
  }

  const balanced = isBalanced(treeData);
  const treeClassName = `binary-tree-container ${balanced ? 'balanced' : 'unbalanced'}`;

  return (
    <div className={treeClassName}>
      <TreeNode node={treeData} />
    </div>
  );
};

BinaryTreeDiv.propTypes = {
  jsonTree: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default BinaryTreeDiv;