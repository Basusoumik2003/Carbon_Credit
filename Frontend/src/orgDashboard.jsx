import React from "react";
import "./orgDashboard.css";
import {
  FaHome,
  FaLeaf,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";

const OrgDashboard = () => {
  const orgData = localStorage.getItem("organization");
  const org = orgData ? JSON.parse(orgData) : null;

  if (!org) {
    return <div>Organization not found. Please log in again.</div>;
  }

  return (
    <div className="org-dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">OrgDashboard</h2>
        <nav className="menu">
          <a href="#"><FaHome /> Home</a>
          <a href="#"><FaLeaf /> Projects</a>
          <a href="#"><FaUsers /> Impact</a>
          <a href="#"><FaCog /> Settings</a>
          <a href="#"><FaSignOutAlt /> Logout</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-info">
            <FaBell />
            <img src="https://via.placeholder.com/40" alt="Org" />
          </div>
        </header>

        <section className="greeting">
          <h1>Welcome, {org.name}</h1>
          <p>Organization Dashboard</p>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h3>Emissions Saved</h3>
            <p>85,000 kg CO₂</p>
          </div>
          <div className="card">
            <h3>Active Projects</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Employees Onboarded</h3>
            <p>240</p>
          </div>
          <div className="card">
            <h3>Credits Earned</h3>
            <p>5,400</p>
          </div>
        </section>
        <section className="charts-tables">
          <div className="chart">
            <h3>Emissions Trend</h3>
            <div className="chart-placeholder">[ Chart Placeholder ]</div>
          </div>

          <div className="recent-orders">
            <h3>Recent Projects</h3>
            <table>
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#P001</td>
                  <td>Solar Roof Panels</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>#P002</td>
                  <td>Tree Plantation Drive</td>
                  <td>Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrgDashboard;
