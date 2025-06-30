import React, { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaUpload,
  FaBlogger,
  FaHandsHelping,
  FaWallet,
  FaSeedling,
  FaUserCircle,
  FaGamepad,
  FaInfoCircle,
  FaAddressCard,
  FaSignOutAlt,
  FaFire,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./userNavbar.css";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userStreak = 3; // Example: 3-day streak

  return (
    <div className="user-navbar">
  {/* Left section with toggle button and logo */}
  <div className="user-left-section">
    <FaBars
      className="user-menu-icon"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    />
    <div className="user-logo">
      <FaSeedling className="user-logo-icon" />
      <span className="user-logo-text">CarbonCredit</span>
    </div>

    {sidebarOpen && (
      <div className="sidebar-dropdown">
        <div className="sidebar-item">
          <FaUserCircle className="sidebar-icon sidebar-blue" />
          <span>Profile</span>
        </div>
        <div className="sidebar-item">
          <FaGamepad className="sidebar-icon sidebar-green" />
          <span>Game</span>
        </div>
        <div className="sidebar-item">
          <FaInfoCircle className="sidebar-icon sidebar-purple" />
          <span>About</span>
        </div>
        <div className="sidebar-item">
          <FaAddressCard className="sidebar-icon sidebar-yellow" />
          <span>Contact</span>
        </div>
        <div className="sidebar-item sidebar-logout">
          <FaSignOutAlt className="sidebar-icon sidebar-red" />
          <span>Logout</span>
        </div>
      </div>
    )}
  </div>

  {/* Center links */}
  <div className="user-nav-links user-nav-links-center">
    <NavLink to="/userDashboard" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""}`}>
      <FaTachometerAlt className="icon blue" />
      <span>Dashboard</span>
    </NavLink>

    <NavLink to="/upload" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""}`}>
      <FaUpload className="icon purple" />
      <span>Upload</span>
    </NavLink>

    <NavLink to="/blog" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""}`}>
      <FaBlogger className="icon orange" />
      <span>Blog</span>
    </NavLink>

    <NavLink to="/engage" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""}`}>
      <FaHandsHelping className="icon teal" />
      <span>Engage</span>
    </NavLink>

    <NavLink to="/wallet" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""}`}>
      <FaWallet className="icon gold" />
      <span>Wallet</span>
    </NavLink>
  </div>

  {/* Right section */}
  <div className="user-right-section">
    <span className="streak-badge">
      <FaFire style={{ color: "#fff" }} /> {userStreak} days
    </span>
    <NavLink to="/profile" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""}`}>
      <FaUserCircle className="icon gray" />
    </NavLink>
  </div>
</div>

  );
};

export default Navbar;
