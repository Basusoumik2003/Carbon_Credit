import React from "react";

const ActivityItem = ({ title, detail, time, credits }) => {
  return (
    <div className="activity-item">
      <div className="activity-header">
        <strong>{title}</strong>
        <span className="activity-credits">+{credits} credits</span>
      </div>
      <div className="activity-detail">
        {detail} • {time}
      </div>
    </div>
  );
};

export default ActivityItem;
