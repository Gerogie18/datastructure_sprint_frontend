import React, { useState } from 'react';
import UserSelectionDiv from '../../components/user-select/UserSelectionDiv.jsx';
import BinaryTreeInput from '../../components/binary-tree-input/BinaryTreeInput.jsx';
import BinaryTreeDiv from '../../components/binary-tree-div/BinaryTreeDiv.jsx';
import { createTree } from '../../services/TreeHistoryService';
import './home.css';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jsonTree, setJsonTree] = useState(null);
  const [error, setError] = useState(null);

  // Handler to receive user from UserSelectionDiv
  const handleUserChange = (user) => {
    setCurrentUser(user);
  };

  const handleTreeSubmit = async (treeRequest) => {
    setError(null);
    try {
      const newTree = await createTree(treeRequest);
      setJsonTree(newTree.jsonTree);
    } catch (err) {
      setError(err.message || 'Failed to create tree.');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <UserSelectionDiv onUserChange={handleUserChange} />
      <BinaryTreeInput currentUser={currentUser} onSubmit={handleTreeSubmit} />
      {error && <div className="error-message">{error}</div>}
      {jsonTree && <BinaryTreeDiv jsonTree={jsonTree} />}
    </div>
  );
};

export default Home;