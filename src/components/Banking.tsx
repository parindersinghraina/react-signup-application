import React from 'react';
import { Link } from 'react-router-dom';
import './Banking.css';

const Banking: React.FC = () => {
  return (
    <div>
      {/* Horizontal container for social links */}
      <div className="social-container">
        <Link to="/banking/scotia" className="social-link">Scotia</Link>
        <Link to="/banking/nbc" className="social-link">NBC</Link>
      </div>

      {/* Iframe for Scotia Bank web */}
      <iframe
        title="Scotia Bank"
        src="https://auth.scotiaonline.scotiabank.com"
        width="400px" 
        height="600px" 
        frameBorder="0"
        allowFullScreen
      />

      {/* Iframe for NBC Bank */}
      <iframe
        title="NBC Bank"
        src="https://www.nbc.ca"
        width="400px"
        height="600px"
        frameBorder="0"
        allowFullScreen
      />

    </div>
  );
};

export default Banking;
