import React, { useState } from 'react';
import UserSelectionDiv from '../../components/user-select/UserSelectionDiv.jsx';
import BinaryTreeInput from '../../components/binary-tree-input/BinaryTreeInput.jsx';
import './home.css';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <UserSelectionDiv onUserChange={setCurrentUser} />
      <BinaryTreeInput currentUser={currentUser} />
    </div>
  );
};

export default Home;