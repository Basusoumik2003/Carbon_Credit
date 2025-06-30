import React from "react";

const Card = ({ title, value, change, color }) => {
  return (
    <div className={`card ${color}`}>
      <h4>{title}</h4>
      <p className="value">{value}</p>
      <span className="change">{change}</span>
    </div>
  );
};

export default Card;
