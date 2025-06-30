import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    location: user?.location || 'New York, USA',
    bio: user?.bio || 'Passionate about sustainable development and environmental conservation. Working towards a greener future for all.',
    joinDate: user?.joinDate || 'January 2024',
    sustainabilityScore: user?.sustainabilityScore || 85,
    goalsCompleted: user?.goalsCompleted || 12,
    carbonFootprint: user?.carbonFootprint || '2.3 tons CO2/year',
    website: user?.website || 'https://example.com',
    twitter: user?.twitter || '@johndoe',
    linkedin: user?.linkedin || 'linkedin.com/in/johndoe',
    // Add EnterDetails fields:
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    registerAs: user?.registerAs || '',
    dob: user?.dob || '',
    countryCode: user?.countryCode || '',
    country: user?.country || '',
    address: user?.address || ''
  });

  // Update profile data when user prop changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'John Doe',
        email: user.email || 'john.doe@example.com',
        phone: user.phone || '+1 (555) 123-4567',
        location: user.location || 'New York, USA',
        bio: user.bio || 'Passionate about sustainable development and environmental conservation. Working towards a greener future for all.',
        joinDate: user.joinDate || 'January 2024',
        sustainabilityScore: user.sustainabilityScore || 85,
        goalsCompleted: user.goalsCompleted || 12,
        carbonFootprint: user.carbonFootprint || '2.3 tons CO2/year',
        website: user.website || 'https://example.com',
        twitter: user.twitter || '@johndoe',
        linkedin: user.linkedin || 'linkedin.com/in/johndoe',
        // Add EnterDetails fields:
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        registerAs: user.registerAs || '',
        dob: user.dob || '',
        countryCode: user.countryCode || '',
        country: user.country || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleSave = () => {
    // Update the user data in the parent component
    const updatedUser = {
      ...user,
      ...profileData
    };
    
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      phone: user?.phone || '+1 (555) 123-4567',
      location: user?.location || 'New York, USA',
      bio: user?.bio || 'Passionate about sustainable development and environmental conservation. Working towards a greener future for all.',
      joinDate: user?.joinDate || 'January 2024',
      sustainabilityScore: user?.sustainabilityScore || 85,
      goalsCompleted: user?.goalsCompleted || 12,
      carbonFootprint: user?.carbonFootprint || '2.3 tons CO2/year',
      website: user?.website || 'https://example.com',
      twitter: user?.twitter || '@johndoe',
      linkedin: user?.linkedin || 'linkedin.com/in/johndoe',
      // Add EnterDetails fields:
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      registerAs: user?.registerAs || '',
      dob: user?.dob || '',
      countryCode: user?.countryCode || '',
      country: user?.country || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="main-content">
      <div className="profile-hero">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your personal information and sustainability journey</p>
        </div>
      </div>

      <section className="profile-section">
        <div className="container">
          <div className="profile-layout">
            <div className="profile-sidebar">
              <div className="profile-photo-container">
                <div className="profile-photo">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Profile Photo"
                    className="profile-img"
                  />
                </div>
                <button className="change-photo-btn">Change Photo</button>
              </div>

              <div className="profile-stats">
                <div className="stat-card">
                  <div className="stat-number">{profileData.sustainabilityScore}%</div>
                  <div className="stat-label">Sustainability Score</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{profileData.goalsCompleted}</div>
                  <div className="stat-label">Goals Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{profileData.carbonFootprint}</div>
                  <div className="stat-label">Carbon Footprint</div>
                </div>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-header">
                <h2>Personal Information</h2>
                <div className="profile-actions">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                      <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
                  )}
                </div>
              </div>

              <div className="profile-form">
                {/* Full Name */}
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="form-value">{profileData.firstName} {profileData.lastName}</div>
                </div>
                {/* Date of Birth or Establishment */}
                <div className="form-group">
                  <label>{profileData.registerAs === 'Organization' ? 'Date of Establishment' : 'Date of Birth'}</label>
                  <div className="form-value">{profileData.dob}</div>
                </div>
                {/* Email Address */}
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="form-value">{profileData.email}</div>
                </div>
                {/* Mobile Number */}
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="form-value">{profileData.mobile}</div>
                </div>
                {/* Address */}
                <div className="form-group">
                  <label>Address</label>
                  <div className="form-value">{profileData.address}, {profileData.country}</div>
                </div>
                {/* Bio */}
                <div className="form-group">
                  <label>Bio</label>
                  <div className="form-value">{profileData.bio}</div>
                </div>
                {/* Member Since */}
                <div className="form-group">
                  <label>Member Since</label>
                  <div className="form-value">{profileData.joinDate}</div>
                </div>
                {/* Social Media Links */}
                <div className="form-group">
                  <label>Social Media Links (optional)</label>
                  <select style={{ width: '100%', marginBottom: '0.5rem' }}>
                    <option value="">Select platform</option>
                    <option value="telegram">Telegram</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Paste your social media link (optional)"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="activity-section">
        <div className="container">
          <h2>Recent Activity</h2>
          <div className="activity-timeline">
            <div className="activity-item">
              <div className="activity-date">Today</div>
              <div className="activity-content">
                <h4>Updated sustainability goals</h4>
                <p>Set new targets for carbon footprint reduction</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-date">Yesterday</div>
              <div className="activity-content">
                <h4>Completed energy audit</h4>
                <p>Identified opportunities for energy savings</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-date">3 days ago</div>
              <div className="activity-content">
                <h4>Joined community garden</h4>
                <p>Started growing organic vegetables</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-date">1 week ago</div>
              <div className="activity-content">
                <h4>Switched to renewable energy</h4>
                <p>Installed solar panels on home</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CarbonCredit</h3>
              <p>Building a sustainable future through innovative carbon credit solutions and environmental consciousness.</p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/Community">Community</Link></li>
                <li><Link to="/contact">Contact</Link></li>
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
              <p>&copy; 2025 CarbonCredit. All rights reserved.</p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;