import React from 'react';
import './Home.css';
import { useState } from 'react';
import Login from './Login'; // If Login.jsx is inside src/
import Signup from "./Signup"
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => setShowLogin(true);
  const handleSignupClick = () => setShowSignup(true);
  const closeModal = () => {
    setShowLogin(false);
    setShowSignup(false);};
  return (

    
    <div className="home">
      <nav className="navbar">
        <div className="logo">
          🌱 <span>Carbon Credit</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Community</a></li>
        </ul>
        <div className="auth-buttons">
  <button className="login" onClick={handleLoginClick}>Login</button>
  <button className="signup" onClick={handleSignupClick}>Sign Up</button>
</div>
{showLogin && (
  <Login
  onClose={closeModal}
  onLogin={(userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // optional: store login info
    closeModal(); // close the modal

    // ✅ Redirect based on role
    if (userData.role === "organization") {
      navigate("/orgDashboard");
    } else {
      navigate("/userDashboard");
    }
  }}
  onSwitchToSignup={() => {
    setShowLogin(false);
    setShowSignup(true);
  }}
/>

)}

{showSignup && (
  <Signup
    onClose={closeModal}
    onSwitchToLogin={() => {
      setShowSignup(false);
      setShowLogin(true);
    }}
  />
)}

      </nav>

      <header className="hero-section">
        <h1>
          Transform Your <span>Carbon Footprint</span> <br /> Into Digital Assets
        </h1>
        <p>
          Join the revolution of sustainable living. Earn carbon credits by using electric vehicles,
          planting trees, and installing solar panels. Turn your eco-friendly actions into
          blockchain-verified tokens.
        </p>
        <div className="cta-buttons">
          <button className="primary">Start Earning Credits</button>
          <button className="secondary">Learn How It Works</button>
        </div>
      </header>

      <section className="stats">
        <div>
          <h2>50M+</h2>
          <p>Tons of CO2 Offset</p>
        </div>
        <div>
          <h2>100K+</h2>
          <p>Active Users</p>
        </div>
        <div>
          <h2>1M+</h2>
          <p>Trees Planted</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How Carbon Credits Work</h2>
        <p>Simple steps to start earning and trading carbon credits through sustainable actions</p>
        <div className="steps">
          <div className="step">
            <div className="number">1</div>
            <div className="icon">🚗</div>
            <h3>Use Electric Vehicles</h3>
            <p>Drive electric cars, bikes, or use public transport. Every mile counts toward reducing emissions.</p>
          </div>
          <div className="step">
            <div className="number">2</div>
            <div className="icon">🌳</div>
            <h3>Plant Trees</h3>
            <p>Each tree absorbs CO2 and generates verified carbon credits over time.</p>
          </div>
          <div className="step">
            <div className="number">3</div>
            <div className="icon">🌞</div>
            <h3>Install Solar Panels</h3>
            <p>Generate clean energy and earn credits from excess energy production.</p>
          </div>
          <div className="step">
            <div className="number">4</div>
            <div className="icon">💰</div>
            <h3>Earn & Trade</h3>
            <p>Trade accumulated carbon credits on our blockchain-powered marketplace.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-section brand">
          <div className="footer-logo">🌱 Carbon Credit</div>
          <p>Making sustainability profitable and accessible for everyone.</p>
        </div>
        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li>Dashboard</li>
            <li>Community</li>
            <li>Marketplace</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>About Carbon Credits</li>
            <li>Help Center</li>
            <li>API Documentation</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="socials">🐦 💼 🐙</div>
        </div>
        <div className="copyright">
          © 2024 Carbon Credit Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
