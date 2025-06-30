import React, { useState } from 'react';
import { FaCar, FaTree, FaSolarPanel } from 'react-icons/fa';
import AssetCard from './AssetCard'; // Ensure this exists
import './upload.css'; // Using namespaced CSS

const Upload = () => {
  const [evCount, setEvCount] = useState(3);
  const [solarCount, setSolarCount] = useState(5);
  const [setActiveEVPopup, setEVPopup] = useState(false);
  const [setActiveTreePopup, setTreePopup] = useState(false);
  const [setActiveSolarPopup, setSolarPopup] = useState(false);

  return (
    <div className="upload-sections-grid">
      {/* EV Section */}
      <div className="upload-section-card fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="upload-section-header">
          <h2 className="upload-section-title">Electric Vehicle</h2>
          <AssetCard title="Electric .." value={evCount} icon={<FaCar />} color="#03A9F4" />
        </div>
        <div className="upload-button-container">
          <button className="upload-btn upload-btn-secondary upload-pulse" onClick={() => setEVPopup(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add EV Details
          </button>
        </div>
        <div className="upload-section-stats">
          <div className="upload-stat-card">
            <p className="upload-stat-label">Total Distance</p>
            <h5 className="upload-stat-value">0 km</h5>
          </div>
          <div className="upload-stat-card">
            <p className="upload-stat-label">CO₂ Saved</p>
            <h5 className="upload-stat-value">0 kg</h5>
          </div>
        </div>
      </div>

      {/* Tree Section */}
      <div className="upload-section-card fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="upload-section-header">
          <h2 className="upload-section-title">Trees Planted</h2>
          <AssetCard title="Trees pla.." value={40} icon={<FaTree />} color="#4CAF50" />
        </div>
        <div className="upload-button-container">
          <button className="upload-btn upload-btn-tertiary upload-pulse" onClick={() => setTreePopup(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Tree Details
          </button>
        </div>
        <div className="upload-section-stats">
          <div className="upload-stat-card">
            <p className="upload-stat-label">Total Trees</p>
            <h5 className="upload-stat-value">0</h5>
          </div>
          <div className="upload-stat-card">
            <p className="upload-stat-label">CO₂ Absorbed</p>
            <h5 className="upload-stat-value">0 kg</h5>
          </div>
        </div>
      </div>

      {/* Solar Section */}
      <div className="upload-section-card fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="upload-section-header">
          <h2 className="upload-section-title">Solar Panels</h2>
          <AssetCard title="Solar Panels" value={solarCount} icon={<FaSolarPanel />} color="#FF9800" />
        </div>
        <div className="upload-button-container">
          <button className="upload-btn upload-pulse" onClick={() => setSolarPopup(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Solar Panel Details
          </button>
        </div>
        <div className="upload-section-stats">
          <div className="upload-stat-card">
            <p className="upload-stat-label">Total Energy</p>
            <h5 className="upload-stat-value">0 kWh</h5>
          </div>
          <div className="upload-stat-card">
            <p className="upload-stat-label">Electricity Bill Saved</p>
            <h5 className="upload-stat-value">₹ 0</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
