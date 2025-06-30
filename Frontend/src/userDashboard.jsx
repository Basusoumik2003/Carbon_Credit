import React from "react";
import Navbar from "./userNavbar";
import Card from "./components/Card";
import Panel from "./components/Panel";
import InfoBlock from "./components/InfoBlock";
import ActivityItem from "./components/ActivityItem";
import VehicleItem from "./components/VehicleItem";
import RecentItem from "./components/RecentItem";
import Footer from "./components/Footer";
import './userDashboard.css'; 

const UserDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard">
        <div className="top-bar">
          <h1>Dashboard</h1>
          <div className="actions">
            <button className="quick-add">+ Quick Add</button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="card-grid">
          <Card title="Total Credits" value="2,847" change="+12% this month" color="blue" />
          <Card title="CO₂ Offset" value="4.2 tons" change="+8% this week" color="green" />
          <Card title="Money Saved" value="₹28,450" change="+22% efficiency" color="orange" />
          <Card title="Rank" value="#47" change="Top 5% globally" color="purple" />
        </div>

        {/* Main Panels */}
        <div className="panel-grid">
          <Panel title="Electric Vehicles" status="Active: 3" className="panel-ev">
            <InfoBlock label="Total Distance" value="1,247 km" />
            <InfoBlock label="CO₂ Saved" value="284 kg" />
            <InfoBlock label="Credits Earned" value="156" />
            <VehicleItem name="Tesla Model 3" distance="847 km this month" status="Active" />
          </Panel>

          <Panel title="Tree Plantations" status="Growing: 156" className="panel-trees">
            <InfoBlock label="Trees Planted" value="156" />
            <InfoBlock label="CO₂ Absorbed" value="3,120 kg" />
            <InfoBlock label="Credits Earned" value="780" />
            <RecentItem name="Oak Trees x25" location="Central Park Project" status="Thriving" />
          </Panel>

          <Panel title="Solar Energy" status="Optimal" className="panel-solar">
            <InfoBlock label="Energy Generated" value="2,840 kWh" />
            <InfoBlock label="Bill Saved" value="₹18,460" />
            <InfoBlock label="Credits Earned" value="568" />
            <div className="text-sm mt-2">☀️ Today’s Weather: Sunny, 28°C - Optimal for solar generation</div>
          </Panel>
        </div>

        {/* Recent Activity */}
        <div className="recent-section">
          <h2>Recent Activity</h2>
          <ActivityItem title="EV Trip Logged" detail="Tesla Model 3 - 45km journey to downtown" time="2 hours ago" credits="12" color="bg-blue-100" />
          <ActivityItem title="Trees Planted" detail="5 Oak trees in Central Park" time="1 day ago" credits="25" color="bg-green-100" />
          <ActivityItem title="Solar Energy Generated" detail="85 kWh from rooftop panels" time="2 days ago" credits="18" color="bg-yellow-100" />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
