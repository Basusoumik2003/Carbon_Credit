import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import './Home.css';

const features = [
  {
    iconUrl: 'https://i.pinimg.com/474x/9e/8d/5e/9e8d5e07eed22f3364b0064a2bbb4dbf.jpg',
    title: 'Risk Management',
    desc: `Comprehensive risk assessment and mitigation strategies for your carbon portfolio investments.`,
  },
  {
    iconUrl: 'https://img.favpng.com/3/25/18/chart-graph-of-a-function-infographic-information-png-favpng-Me2vt9rFvHtWhUjADqmVynUhq.jpg',
    title: 'Advanced Analytics',
    desc: 'Sophisticated data analytics and reporting tools to track your carbon reduction progress and ROI metrics',
  },
  {
    iconUrl: 'https://cdn.vectorstock.com/i/500p/20/58/vegan-world-logo-globe-leaf-vector-27912058.jpg',
    title: 'Global Portfolio',
    desc: 'Access to premium carbon offset projects across 50+ countries, with institutional-grade verification and transparency',
  },
];

const Home = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [featureIndex, setFeatureIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const doSlide = (direction) => {
    if (transitioning) return;
    setSlideDirection(direction);
    setTransitioning(true);
    setNextIndex(
      direction === 'right'
        ? (featureIndex + 1) % features.length
        : (featureIndex - 1 + features.length) % features.length
    );
    setTimeout(() => {
      setFeatureIndex(
        direction === 'right'
          ? (featureIndex + 1) % features.length
          : (featureIndex - 1 + features.length) % features.length
      );
      setTransitioning(false);
      setNextIndex(null);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      doSlide('right');
    }, 4000);
    return () => clearInterval(interval);
  }, [featureIndex, transitioning]);

  const closeModal = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <>
      <Navbar
  isAuthenticated={isAuthenticated}
  user={user}
  showAuth={showLogin || showSignup}
  openLoginPopup={() => setShowLogin(true)}
  openSignupPopup={() => setShowSignup(true)}
/>


      <div className="hero-section">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <h1>Building a Sustainable Future</h1>
              <p>
                Join us in creating a better world through sustainable development practices and
                environmental consciousness.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-white" onClick={handleGetStarted}>Get Started</button>
                <Link to="/about" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Sustainable Future"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Sustainable Development?</h2>
          <p className="features-subtitle">
            Explore our core values and the impact we strive to make for a greener tomorrow.
          </p>
          <div className="features-inline">
            {features.map((feature, idx) => (
              <div className="feature-card professional-feature-card" key={idx}>
                <div className="feature-icon professional-feature-icon">
                  <img
                    src={feature.iconUrl}
                    alt={`${feature.title} icon`}
                    className="realistic-feature-icon"
                  />
                </div>
                <h3 className="professional-feature-title">{feature.title}</h3>
                <p className="professional-feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
                <li><Link to="/disclaimer">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-social-inline">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <p className="footer-copyright">
                &copy; 2025 CarbonCredit. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={closeModal}
          onLogin={(userData) => {
            localStorage.setItem('user', JSON.stringify(userData));
            closeModal();
            if (userData.role === 'organization') {
              navigate('/orgDashboard');
            } else {
              navigate('/userDashboard');
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
    </>
  );
};

export default Home;
