import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userDashboard.css';
import PopupForms from './popupform'; // ✅ Adjust the path if needed
//import AssetCard from './AssetCard';

const UserDashboard = () => {
    const [evCount, setEvCount] = useState(0);
useEffect(() => {
  const fetchEVs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/evmasterdata/${userId}`);
      const result = await response.json();

      if (result.status === 'success') {
        setEvData(result.data);
        setEvCount(result.count); // 👈 Add this
      } else {
        console.error("Failed to fetch EVs");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchEVs();
}, []);

    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user) return <div className="error text-red-500 text-center p-4 bg-white rounded shadow">User not found. Please log in again.</div>;

    const [activeEVPopup, setActiveEVPopup] = useState(false);
    const [activeSolarPopup, setActiveSolarPopup] = useState(false);
    const [activeTreePopup, setActiveTreePopup] = useState(false);

    const [evData, setEvData] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [solarData, setSolarData] = useState([]);

    const [evModelLoaded, setEvModelLoaded] = useState(false);
    const [treeModelLoaded, setTreeModelLoaded] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    // Load all asset data on mount
    const fetchAssets = () => {
        fetch('http://localhost:8080/api/evmasterdata')
            .then(res => res.json())
            .then(setEvData)
            .catch(() => setEvData([]));

        fetch('http://localhost:5006/api/tree')
            .then(res => res.json())
            .then(setTreeData)
            .catch(() => setTreeData([]));

        fetch('http://localhost:5006/api/solar')
            .then(res => res.json())
            .then(setSolarData)
            .catch(() => setSolarData([]));
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleSaveEV = (newEV) => {
        setActiveEVPopup(false);
        fetchAssets();
    };
    const handleSaveTree = (newTree) => {
        setActiveTreePopup(false);
        fetchAssets();
    };

    const handleSaveSolar = (newSolar) => {
        setActiveSolarPopup(false);
        fetchAssets();
    };

    // Card click handler
    const handleCardClick = (asset) => {
        if (asset.type === 'EV') {
            navigate('/ev-details', { state: { asset } });
        } else if (asset.type === 'Tree') {
            navigate('/tree-details', { state: { asset } });
        } else {
            navigate('/solar-details', { state: { asset } });
        }
    };

    // Render asset section
    const renderSection = (title, dataArray, type) => (
        <div className="my-6">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {dataArray.length === 0 ? (
                <p className="text-gray-500 italic">
                    No {type.toLowerCase()} assets added yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataArray.map((item) => (
                        <AssetCard
                            key={item._id}
                            asset={{ ...item, type }}
                            onClick={() => handleCardClick({ ...item, type })}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    useEffect(() => {
        // Simulate loading of 3D models
        const evModelTimer = setTimeout(() => {
            setEvModelLoaded(true);
        }, 1000);

        const treeModelTimer = setTimeout(() => {
            setTreeModelLoaded(true);
        }, 1200);

        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressTimer = setTimeout(() => {
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 500);

        // Cleanup timers
        return () => {
            clearTimeout(evModelTimer);
            clearTimeout(treeModelTimer);
            clearTimeout(progressTimer);
        };
    }, []);

    const handleButtonClick = (e) => {
        e.target.classList.add('animate-pulse');
        setTimeout(() => {
            e.target.classList.remove('animate-pulse');
        }, 1000);
    };

    return (
        <div className="dashboard-container">
<div className="navbar">
      <div className="navbar-left">
        <h2 className="logo">
          Carbon<span>Credit</span>
        </h2>
      </div>

      <div className="navbar-right">
        <div className="notification-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="notification-indicator"></span>
        </div>

        <div className="user-profile">
          <div className="avatar">JS</div>
          <span className="username">{user?.username || 'User'}</span>

        </div>

        <button className="btn-secondary icon-button" onClick={handleButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div> 

    
          
            <div className="dashboard-content fade-in">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title">Dashboard</h1>
                        <p className="page-subtitle">Track your carbon credits and environmental impact</p>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <p className="stat-label">EV Mileage</p>
                        <h4 className="stat-value">0 km</h4>
                        <div className="progress-bar">
                            <div className="progress-fill" data-width="0%"></div>
                        </div>
                        <p className="stat-subtitle">No assets</p>
                    </div>

                    <div className="stat-card">
                        <p className="stat-label">Trees Planted</p>
                        <h4 className="stat-value">0 Trees</h4>
                        <div className="progress-bar">
                            <div className="progress-fill" data-width="0%"></div>
                        </div>
                        <p className="stat-subtitle">No assets</p>
                    </div>

                    <div className="stat-card">
                        <p className="stat-label">Solar Panels Installed</p>
                        <h4 className="stat-value">0 KWH</h4>
                        <div className="progress-bar">
                            <div className="progress-fill" data-width="0%"></div>
                        </div>
                        <p className="stat-subtitle">No assets</p>
                    </div>
                </div>

                <div className="asset-sections-grid">
                    <div className="ev-section section-card fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="section-header">
                            <h2 className="section-title">Electric Vehicles</h2>
                           <span className="badge">{evCount} Assets</span>

                        </div>

                        <div className="button-container">
                            <button className="btn-primary btn-secondary pulse" onClick={() => setActiveEVPopup(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add EV Details
                            </button>
                        </div>

                        {renderSection('Electric Vehicles (EVs)', evData, 'EV')}

                        <div className="section-stats">
                            <div className="stat-card mini">
                                <p className="stat-label">Total Distance</p>
                                <h5 className="stat-value">0 km</h5>
                            </div>
                            <div className="stat-card mini">
                                <p className="stat-label">CO₂ Saved</p>
                                <h5 className="stat-value">0 kg</h5>
                            </div>
                        </div>
                    </div>

                    <div className="tree-section section-card fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="section-header">
                            <h2 className="section-title">Trees Planted</h2>
                            <span className="badge"> {treeData.length} Assets</span>
                        </div>

                        <div className="button-container">
                            <button className="btn-primary btn-tertiary pulse" onClick={() => setActiveTreePopup(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Tree Details
                            </button>
                        </div>

                        {renderSection('Tree Plantations', treeData, 'Tree')}

                        <div className="section-stats">
                            <div className="stat-card mini">
                                <p className="stat-label">Total Trees</p>
                                <h5 className="stat-value">0</h5>
                            </div>
                            <div className="stat-card mini">
                                <p className="stat-label">CO₂ Absorbed</p>
                                <h5 className="stat-value">0 kg</h5>
                            </div>
                        </div>
                    </div>

                    <div className="solar-section section-card fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="section-header">
                            <h2 className="section-title">Solar Panels</h2>
                            <span className="badge"> {solarData.length} Assets</span>
                        </div>

                        <div className="button-container">
                            <button className="btn-primary pulse" onClick={() => setActiveSolarPopup(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Solar Panel Details
                            </button>
                        </div>

                        {renderSection('Solar Panels', solarData, 'Solar')}

                        <div className="section-stats">
                            <div className="stat-card mini">
                                <p className="stat-label">Total Energy</p>
                                <h5 className="stat-value">0 kWh</h5>
                            </div>
                            <div className="stat-card mini">
                                <p className="stat-label">Electricity Bill Saved</p>
                                <h5 className="stat-value">₹ 0</h5> 
                            </div>
                        </div>
                    </div>
                </div>

              

                <div className="history-card fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="history-header">
                        <h2 className="section-title">Activity History</h2>
                        <button className="btn-secondary filter-btn" onClick={handleButtonClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                        </button>
                    </div>

                    <div className="history-table-container">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Details</th>
                                    <th>Carbon Credits</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="history-item">
                                    <td>Jun 30, 2023</td>
                                    <td><span className="history-badge ev">EV</span></td>
                                    <td>Tesla Model 3 - 1,250 km traveled</td>
                                    <td className="credits">+15 CC</td>
                                    <td><button className="action-btn">View</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <button className="btn-secondary pagination-btn prev" onClick={handleButtonClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="pagination-numbers">
                            <button className="btn-primary pagination-number">1</button>
                            <button className="btn-secondary pagination-number">2</button>
                            <button className="btn-secondary pagination-number">3</button>
                        </div>

                        <button className="btn-secondary pagination-btn next" onClick={handleButtonClick}>
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <PopupForms
                activeEVPopup={activeEVPopup}
                setActiveEVPopup={setActiveEVPopup}
                activeSolarPopup={activeSolarPopup}
                setActiveSolarPopup={setActiveSolarPopup}
                activeTreePopup={activeTreePopup}
                setActiveTreePopup={setActiveTreePopup}
                handleSaveEV={handleSaveEV}
                setEvCount={setEvCount}
                handleSaveTree={handleSaveTree}
                handleSaveSolar={handleSaveSolar}
            />
        </div>
    );
};

export default UserDashboard;
