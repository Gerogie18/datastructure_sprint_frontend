import React from 'react';
import './FooterBar.css';

const FooterBar = () => {
  return (
    <footer className="footer-bar">
      <span>© {new Date().getFullYear()} Binary Tree App</span>
    </footer>
  );
};

export default FooterBar;
