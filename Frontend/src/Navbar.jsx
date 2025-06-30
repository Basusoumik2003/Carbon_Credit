import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ openLoginPopup, openSignupPopup }) => {
  return (
    <nav className="home-navbar">
      <div className="navbar-left">
        <FaLeaf className="logo-icon" />
        <span className="logo-text">Carbon Credit</span>
      </div>
      <div className="navbar-right">
        <button className="btn login-btn" onClick={openLoginPopup}>Login</button>
        <button className="btn signup-btn" onClick={openSignupPopup}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
