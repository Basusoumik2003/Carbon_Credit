import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Engage.css';

const Engage = () => {
  const navigate = useNavigate();
  return (
    <div className="engage-page">
    
      <div className="engage-divs">
        <div className="engage-card engage-card-large" onClick={() => navigate('/community')}>
          <div className="engage-card-img engage-card-img-full">
            <img src="https://reputationtoday.in/wp-content/uploads/2020/04/4d8dd-students-in-community.001.png" alt="Community" className="engage-img-pic engage-img-pic-full" />
          </div>
          <div className="engage-label engage-label-large engage-label-small">
            Community
            <div className="engage-desc">Connect, share, and grow with like-minded people.</div>
          </div>
        </div>
        <div className="engage-card engage-card-large" onClick={() => navigate('/game')}>
          <div className="engage-card-img engage-card-img-full">
            <img src="https://618media.com/wp-content/uploads/2024/02/dlss-3-sustainability-in-gaming-tech.webp" alt="Games" className="engage-img-pic engage-img-pic-full" />
          </div>
          <div className="engage-label engage-label-large engage-label-small">
            Games
            <div className="engage-desc">Play, compete, and enjoy interactive fun.</div>
          </div>
        </div>
        <div className="engage-card engage-card-large" onClick={() => navigate('/leaderboard')}>
          <div className="engage-card-img engage-card-img-full">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/783/523/small/premium-download-icon-of-leaderboard-vector.jpg" alt="LeaderBoard" className="engage-img-pic engage-img-pic-full" />
          </div>
          <div className="engage-label engage-label-large engage-label-small">
            LeaderBoard
            <div className="engage-desc">See top performers and track your progress.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engage;
