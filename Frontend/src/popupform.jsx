// PopupForms.js - React component file with all three popup forms
import React, { useState, useEffect } from 'react';
import './popupform.css';
const PopupForms = ({
    activeEVPopup,
    setActiveEVPopup,
    activeSolarPopup,
    setActiveSolarPopup,
    activeTreePopup,
    setActiveTreePopup,
    handleSaveEV,
    handleSaveTree,   // <-- add this
    handleSaveSolar
}) => {




    // State for managing popups

    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // List state for fetched data
    const [evList, setEvList] = useState([]);      // All EVs from backend
    const [treeList, setTreeList] = useState([]);  // All trees from backend
    const [solarPanels, setSolarPanels] = useState([]); // All solar panels from backend





    const [solarPanelData, setSolarPanelData] = useState({
        manufacturer: '',
        model: '',
        capacity: '',
        installationDate: '',
        orientation: 'south',
        tiltAngle: '',
        efficiency: '',
        area: '',
        inverterType: 'string',
        maintenanceDate: ''
    });
    const [evData, setEVData] = useState({
        manufacturer: '',
        model: '',
        year: '',
        batteryCapacity: '',
        range: '',
        chargingType: 'level2',
        averageMileage: '',
        homeCharging: 'yes',
        publicCharging: 'sometimes',
        lastServiceDate: ''
    });
    const [treeData, setTreeData] = useState({
        species: '',
        location: '',
        plantingDate: '',
        photos: []
    });



    useEffect(() => {
        // Load EV data from backend
        fetch('http://localhost:5006/api/ev')
            .then(res => res.json())
            .then(data => setEVData(data))
            .catch(() => setEVData([]));

        // Load Tree data from backend
        fetch('http://localhost:5006/api/tree')
            .then(res => res.json())
            .then(data => setTreeData(data))
            .catch(() => setTreeData([]));

        // Leave solar as-is for now
        fetch('http://localhost:5006/api/solar')
            .then(res => res.json())
            .then(data => setSolarPanelData(data))
            .catch(() => setSolarPanelData([]));
    }, []);



    // Toast notification handler
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 3000);
    };


    const handleSolarSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...solarPanelData,
            addedDate: new Date().toISOString().split('T')[0],
            carbonCredits: Number(solarPanelData.carbonCredits) || 0
        };

        try {
            const response = await fetch('http://localhost:5006/api/solar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showToast('Solar panel saved to database!', 'success');
                setActiveSolarPopup(false);
            } else {
                showToast('Failed to save solar panel.', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Server error!', 'error');
        }
    };



   const handleEVSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    manufacturer: evData.manufacturer,
    model: evData.model,
    year: Number(evData.year),
    batteryCapacity: Number(evData.batteryCapacity),
    range: Number(evData.range),
    averageMileage: Number(evData.averageMileage),
    addedDate: new Date().toISOString().split('T')[0],
    carbonCredits: Number(evData.carbonCredits) || 0,

    // Additional fields (must also exist in your backend schema)
    EVCategory: evData.EVCategory,
    chargingType: evData.chargingType,
    homeCharging: evData.homeCharging,
    publicCharging: evData.publicCharging,
    topSpeed: Number(evData.topSpeed),
    lastServiceDate: evData.lastServiceDate,
  };

  try {
    const response = await fetch('http://localhost:5006/api/ev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const savedEV = await response.json(); // fetch saved item
      showToast('EV saved to database!', 'success');
      handleSaveEV(savedEV); // update state in Dashboard
      setActiveEVPopup(false);
    } else {
      const errMsg = await response.text(); // 👈 to see what the server said
      console.error("EV submit failed:", errMsg);
      showToast('Failed to save EV: ' + errMsg, 'error');
    }
  } catch (error) {
    console.error("EV submit error:", error);
    showToast('Server error! ' + error.message, 'error');
  }
};



    const handleTreeSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...treeData,
            addedDate: new Date().toISOString().split('T')[0],
            carbonCredits: Number(treeData.carbonCredits) || 0
        };

        try {
            const response = await fetch('http://localhost:5006/api/tree', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showToast('Tree saved to database!', 'success');
                setActiveTreePopup(false);
            } else {
                showToast('Failed to save tree.', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Server error!', 'error');
        }
    };

    // File upload handler for tree photos
    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Only allow up to 6 photos
            const newFiles = files.slice(0, 6 - (treeData.photos || []).length);
            // Convert files to base64 for storage and preview
            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setTreeData(prev => ({
                        ...prev,
                        photos: [...prev.photos, reader.result].slice(0, 6)
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };
    // Remove photo handler
    const removePhoto = (index) => {
        setTreeData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
    };
    return (
        <div>
            {/* EV Popup */}
            <div className={`popup-overlay ${activeEVPopup ? 'active' : ''}`} onClick={() => setActiveEVPopup(false)}>
                <div className={`popup ${activeEVPopup ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                    <div className="popup-header">
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="9" width="20" height="10" rx="2" ry="2"></rect>
                                <circle cx="7" cy="19" r="2"></circle>
                                <circle cx="17" cy="19" r="2"></circle>
                                <path d="M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path>
                                <path d="M15 13h2"></path>
                                <path d="M7 13h2"></path>
                            </svg>
                            Electric Vehicle Details
                        </h2>
                        <button className="popup-close" onClick={() => setActiveEVPopup(false)}>×</button>
                    </div>
                    <form onSubmit={handleEVSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="EVCategory">Vehicle Category</label>
                                <select
                                    id="EVCategory"
                                    className="form-control"
                                    value={evData.EVCategory}
                                    onChange={(e) => setEVData({ ...evData, EVCategory: e.target.value })}
                                    required
                                >
                                    <option value="Two-Wheelers">Two-Wheelers</option>
                                    <option value="Three-Wheeler">Three-Wheeler </option>
                                    <option value="Hatchbacks">Hatchbacks</option>
                                    <option value="Sedans">Sedans</option>
                                    <option value="SUVs">SUVs</option>
                                    <option value="MPVs">MPVs</option>
                                    <option value="Buses">Buses</option>
                                    <option value="Trucks">Trucks</option>
                                    <option value="Vans">Vans</option>
                                    <option value="Tractors">Tractors</option>
                                    <option value="nForklifts">Forklifts</option>
                                    <option value="NEVs">NEVs</option>
                                    <option value="Golf Carts">Golf Carts</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ev-manufacturer">Manufacturer</label>
                                <input
                                    type="text"
                                    id="ev-manufacturer"
                                    className="form-control"
                                    placeholder="e.g., Tesla, Nissan, Chevrolet"
                                    value={evData.manufacturer}
                                    onChange={(e) => setEVData({ ...evData, manufacturer: e.target.value })}
                                    required
                                />
                            </div>
                        </div>




                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="ev-model">Model</label>
                                <input
                                    type="text"
                                    id="ev-model"
                                    className="form-control"
                                    placeholder="e.g., Model 3, Leaf, Bolt"
                                    value={evData.model}
                                    onChange={(e) => setEVData({ ...evData, model: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ev-year">Year</label>
                                <input
                                    type="number"
                                    id="ev-year"
                                    className="form-control"
                                    placeholder="e.g., 2022"
                                    min="2000"
                                    max="2030"
                                    value={evData.year}
                                    onChange={(e) => setEVData({ ...evData, year: e.target.value })}
                                    required
                                />
                            </div>
                        </div>



                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="batteryCapacity">Battery Capacity (kWh)</label>
                                <input
                                    type="number"
                                    id="batteryCapacity"
                                    className="form-control"
                                    placeholder="e.g., 75"
                                    step="0.1"
                                    min="1"
                                    value={evData.batteryCapacity}
                                    onChange={(e) => setEVData({ ...evData, batteryCapacity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="chargingType">Primary Charging Type</label>
                                <select
                                    id="chargingType"
                                    className="form-control"
                                    value={evData.chargingType}
                                    onChange={(e) => setEVData({ ...evData, chargingType: e.target.value })}
                                    required
                                >
                                    <option value="level1">Level 1 (120V)</option>
                                    <option value="level2">Level 2 (240V)</option>
                                    <option value="dcfast">DC Fast Charging</option>
                                    <option value="tesla">Tesla Supercharger</option>
                                </select>
                            </div>
                        </div>



                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="range">Range (miles)</label>
                                <input
                                    type="number"
                                    id="range"
                                    className="form-control"
                                    placeholder="e.g., 300"
                                    min="1"
                                    value={evData.range}
                                    onChange={(e) => setEVData({ ...evData, range: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="averageMileage">Average Daily Mileage</label>
                                <input
                                    type="number"
                                    id="averageMileage"
                                    className="form-control"
                                    placeholder="e.g., 30"
                                    min="0"
                                    value={evData.averageMileage}
                                    onChange={(e) => setEVData({ ...evData, averageMileage: e.target.value })}
                                    required
                                />
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="homeCharging">Home Charging Available</label>
                                <select
                                    id="homeCharging"
                                    className="form-control"
                                    value={evData.homeCharging}
                                    onChange={(e) => setEVData({ ...evData, homeCharging: e.target.value })}
                                    required
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="publicCharging">Public Charging Usage</label>
                                <select
                                    id="publicCharging"
                                    className="form-control"
                                    value={evData.publicCharging}
                                    onChange={(e) => setEVData({ ...evData, publicCharging: e.target.value })}
                                    required
                                >
                                    <option value="never">Never</option>
                                    <option value="rarely">Rarely</option>
                                    <option value="sometimes">Sometimes</option>
                                    <option value="frequently">Frequently</option>
                                    <option value="always">Always</option>
                                </select>
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="lastServiceDate">Last Service Date</label>
                                <input
                                    type="date"
                                    id="lastServiceDate"
                                    className="form-control"
                                    value={evData.lastServiceDate}
                                    onChange={(e) => setEVData({ ...evData, lastServiceDate: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="topSpeed">Top Speed</label>
                                <input
                                    type="number"
                                    id="topSpeed"
                                    className="form-control"
                                    placeholder="e.g., 80km/h"
                                    min="0"
                                    value={evData.topSpeed}
                                    onChange={(e) => setEVData({ ...evData, topSpeed: e.target.value })}
                                    required
                                />
                            </div>
                        </div>





                        <div className="form-actions">
                            <button type="button" className="btn-primary btn-cancel" onClick={() => setActiveEVPopup(false)}>Cancel</button>
                            <button type="submit" className="btn-primary btn-submit-ev">Save Details</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Tree Popup */}
            <div className={`popup-overlay ${activeTreePopup ? 'active' : ''}`} onClick={() => setActiveTreePopup(false)}>
                <div className={`popup ${activeTreePopup ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                    <div className="popup-header">
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 14l-5-5-5 5"></path>
                                <path d="M12 9v12"></path>
                                <path d="M12 3a5 5 0 0 1 5 5c0 2-3 3-5 3s-5-1-5-3a5 5 0 0 1 5-5z"></path>
                            </svg>
                            Tree Planting Details
                        </h2>
                        <button className="popup-close" onClick={() => setActiveTreePopup(false)}>×</button>
                    </div>
                    <form onSubmit={handleTreeSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="species">Tree Species</label>
                                <input
                                    type="text"
                                    id="species"
                                    className="form-control"
                                    placeholder="e.g., Oak, Pine, Maple"
                                    value={treeData.species}
                                    onChange={(e) => setTreeData({ ...treeData, species: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="plantingDate">Planting Date</label>
                                <input
                                    type="date"
                                    id="plantingDate"
                                    className="form-control"
                                    value={treeData.plantingDate}
                                    onChange={(e) => setTreeData({ ...treeData, plantingDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location Description</label>
                            <input
                                type="text"
                                id="location"
                                className="form-control"
                                placeholder="e.g., Backyard, Community Garden, 123 Main St"
                                value={treeData.location}
                                onChange={(e) => setTreeData({ ...treeData, location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tree Photos (Upload up to 6)</label>
                            <label className="file-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoUpload}
                                    // disabled={treeData.photos.length >= 6}

                                    disabled={(treeData.photos || []).length >= 6}
                                />
                                <svg className="file-upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <div className="file-upload-text">
                                    <strong>Click to upload photos</strong>
                                    <p>Include selfie, thumb measurement, and distance shots</p>
                                    <p>{(treeData.photos || []).length}/6 photos uploaded</p>
                                </div>
                            </label>
                            {(treeData.photos || []).length > 0 && (
                                <div className="photo-preview">
                                    {treeData.photos.map((photo, index) => (
                                        <div key={index} className="photo-item">
                                            <img src={photo} alt={`Tree photo ${index + 1}`} />
                                            <button
                                                type="button"
                                                className="remove-photo"
                                                onClick={() => removePhoto(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-primary btn-cancel" onClick={() => setActiveTreePopup(false)}>Cancel</button>
                            <button type="submit" className="btn-primary btn-submit-tree">Save Details</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Solar Panel Popup */}
            <div className={`popup-overlay ${activeSolarPopup ? 'active' : ''}`} onClick={() => setActiveSolarPopup(false)}>
                <div className={`popup ${activeSolarPopup ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                    <div className="popup-header">
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="7" width="18" height="12" rx="2" ry="2"></rect>
                                <line x1="3" y1="13" x2="21" y2="13"></line>
                                <line x1="9" y1="7" x2="9" y2="19"></line>
                                <line x1="15" y1="7" x2="15" y2="19"></line>
                            </svg>
                            Solar Panel Details
                        </h2>
                        <button className="popup-close" onClick={() => setActiveSolarPopup(false)}>×</button>
                    </div>
                    <form onSubmit={handleSolarSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input
                                    type="text"
                                    id="manufacturer"
                                    className="form-control"
                                    placeholder="e.g., SunPower, LG, Tesla"
                                    value={solarPanelData.manufacturer}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, manufacturer: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="model">Model</label>
                                <input
                                    type="text"
                                    id="model"
                                    className="form-control"
                                    placeholder="e.g., X22-370"
                                    value={solarPanelData.model}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, model: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="capacity">Capacity (kW)</label>
                                <input
                                    type="number"
                                    id="capacity"
                                    className="form-control"
                                    placeholder="e.g., 5.6"
                                    step="0.1"
                                    min="0.1"
                                    value={solarPanelData.capacity}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, capacity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="installationDate">Installation Date</label>
                                <input
                                    type="date"
                                    id="installationDate"
                                    className="form-control"
                                    value={solarPanelData.installationDate}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, installationDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="orientation">Panel Orientation</label>
                                <select
                                    id="orientation"
                                    className="form-control"
                                    value={solarPanelData.orientation}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, orientation: e.target.value })}
                                    required
                                >
                                    <option value="north">North</option>
                                    <option value="northeast">Northeast</option>
                                    <option value="east">East</option>
                                    <option value="southeast">Southeast</option>
                                    <option value="south">South</option>
                                    <option value="southwest">Southwest</option>
                                    <option value="west">West</option>
                                    <option value="northwest">Northwest</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tiltAngle">Tilt Angle (degrees)</label>
                                <input
                                    type="number"
                                    id="tiltAngle"
                                    className="form-control"
                                    placeholder="e.g., 30"
                                    min="0"
                                    max="90"
                                    value={solarPanelData.tiltAngle}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, tiltAngle: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="efficiency">Panel Efficiency (%)</label>
                                <input
                                    type="number"
                                    id="efficiency"
                                    className="form-control"
                                    placeholder="e.g., 22.5"
                                    step="0.1"
                                    min="1"
                                    max="100"
                                    value={solarPanelData.efficiency}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, efficiency: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="area">Total Panel Area (m²)</label>
                                <input
                                    type="number"
                                    id="area"
                                    className="form-control"
                                    placeholder="e.g., 25"
                                    step="0.1"
                                    min="0.1"
                                    value={solarPanelData.area}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, area: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="inverterType">Inverter Type</label>
                                <select
                                    id="inverterType"
                                    className="form-control"
                                    value={solarPanelData.inverterType}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, inverterType: e.target.value })}
                                    required
                                >
                                    <option value="string">String Inverter</option>
                                    <option value="microinverter">Microinverter</option>
                                    <option value="hybrid">Hybrid Inverter</option>
                                    <option value="central">Central Inverter</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="maintenanceDate">Last Maintenance Date</label>
                                <input
                                    type="date"
                                    id="maintenanceDate"
                                    className="form-control"
                                    value={solarPanelData.maintenanceDate}
                                    onChange={(e) => setSolarPanelData({ ...solarPanelData, maintenanceDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-primary btn-cancel" onClick={() => setActiveSolarPopup(false)}>Cancel</button>
                            <button type="submit" className="btn-primary btn-submit">Save Details</button>
                        </div>
                    </form>
                </div>
            </div>



            {/* Toast Notification */}
            <div className={`toast ${toast.show ? 'show' : ''}`}>
                <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="toast-message">{toast.message}</span>
            </div>
        </div>
    );
};
export default PopupForms;