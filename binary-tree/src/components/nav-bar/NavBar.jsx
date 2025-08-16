import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        Binary Tree App
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/tree-history" className="nav-link">
          Tree History
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
