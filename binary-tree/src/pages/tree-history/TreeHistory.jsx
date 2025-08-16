import React from 'react';
import BinaryTreeInput from '../../components/binary-tree-input/BinaryTreeInput.jsx';
import BinaryTreeDiv from '../../components/binary-tree-div/BinaryTreeDiv.jsx';
import useTreeHistory from './TreeHistoryHook';
import './TreeHistory.css';

const TreeHistory = () => {
  const {
    trees,
    users,
    selectedTree,
    selectedUser,
    showInput,
    loading,
    error,
    getUserName,
    handleRowClick,
    handleCloseInput,
  } = useTreeHistory();

  return (
    <div className="tree-history-page">
      <h1>Tree History</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <table className="tree-history-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Numbers</th>
          </tr>
        </thead>
        <tbody>
          {trees.map(tree => (
            <tr key={tree.id} onClick={() => handleRowClick(tree)} style={{ cursor: 'pointer' }}>
              <td>{getUserName(tree.userId)}</td>
              <td>{tree.inputNumbers}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTree && (
        <div className="tree-visualization-container">
          <h3>Tree Visualization</h3>
          <BinaryTreeDiv jsonTree={selectedTree.jsonTree} />
        </div>
      )}
    </div>
  );
};

export default TreeHistory;
