import React from 'react';

const BinaryTreeDivHook = () => {
  // Parse JSON string to tree object
  const parseTreeJson = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse tree JSON:', error);
      return null;
    }
  };

  // Recursive component to render tree nodes
  const TreeNode = ({ node, level = 0 }) => {
    if (!node) return null;

    return (
      <div className="tree-node-container">
        <div className="tree-node" style={{ '--level': level }}>
          <div className="node-value">{node.value}</div>
        </div>
        
        {(node.left || node.right) && (
          <div className="tree-children">
            <div className="left-child">
              {node.left && <TreeNode node={node.left} level={level + 1} />}
            </div>
            <div className="right-child">
              {node.right && <TreeNode node={node.right} level={level + 1} />}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Main render function for the tree
  const renderTree = (rootNode) => {
    if (!rootNode) {
      return <p className="empty-tree">Empty tree</p>;
    }

    return (
      <div className="tree-root">
        <TreeNode node={rootNode} level={0} />
      </div>
    );
  };

  return {
    renderTree,
    parseTreeJson
  };
};

export default BinaryTreeDivHook;