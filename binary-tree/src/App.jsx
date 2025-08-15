
import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//pages
import Home from './pages/home/Home.jsx';
import TreeHistory from './pages/tree-history/TreeHistory.jsx';

//components
import NavBar from './components/nav-bar/NavBar.jsx';
import FooterBar from './components/footer-bar/FooterBar.jsx';

function App() {
  return (
    <div className='app-container'>
      <NavBar />
      <div className='page-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tree-history' element={<TreeHistory />} />
          {/* Redirect all other routes to home */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
      <FooterBar />
    </div>
  );
}

export default App
