import React from 'react';
import BinaryTreeDivHook from './BinaryTreeDivHook.jsx';
import './BinaryTreeDiv.css';

const BinaryTreeDiv = ({ treeData, onClose, isVisible }) => {
  const { renderTree, parseTreeJson } = BinaryTreeDivHook();

  if (!isVisible || !treeData) return null;

  // Parse the tree structure from JSON if needed
  const treeStructure = typeof treeData.jsonTree === 'string' 
    ? parseTreeJson(treeData.jsonTree) 
    : treeData.jsonTree;

  return (
    <div className="binary-tree-overlay">
      <div className="binary-tree-container">
        {/* Header with close button */}
        <div className="tree-header">
          <h3>Binary Search Tree</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Tree Info */}
        <div className="tree-info">
          <p><strong>Input Numbers:</strong> {treeData.inputNumbers}</p>
          {treeData.user && (
            <p><strong>Created by:</strong> {treeData.user.name}</p>
          )}
          {treeData.id && (
            <p><strong>Tree ID:</strong> {treeData.id}</p>
          )}
        </div>

        {/* Tree Visualization */}
        <div className="tree-visualization">
          {treeStructure ? (
            renderTree(treeStructure)
          ) : (
            <p className="no-tree">No tree data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeDiv;