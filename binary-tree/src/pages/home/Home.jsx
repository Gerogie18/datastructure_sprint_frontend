import React from 'react';
import UserSelectionDiv from '../../components/user-select/UserSelectionDiv.jsx';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <UserSelectionDiv />
    </div>
  );
};

export default Home;