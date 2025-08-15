import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/tree-history" className="nav-link">
        Tree History
      </NavLink>
    </nav>
  );
};

export default NavBar;
