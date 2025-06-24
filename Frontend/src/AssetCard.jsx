// AssetCard.jsx
import React from 'react';
import './AssetCard.css';

const AssetCard = ({ title, value, icon, color }) => {
  return (
    <div className="asset-card" style={{ borderColor: color }}>
      <div className="asset-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="asset-content">
        <div className="asset-title">{title}</div>
        <div className="asset-value">{value}</div>
      </div>
    </div>
  );
};

export default AssetCard;
