// SocialNetwork.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SocialNetwork.css'; // Import the CSS file

const SocialNetwork: React.FC = () => {
  return (
    <div>
      {/* Horizontal container for social links */}
      <div className="social-container">
        <Link to="/socialnetwork/whatsapp" className="social-link">WhatsApp</Link>
        <Link to="/socialnetwork/instagram" className="social-link">Instagram</Link>
        <Link to="/socialnetwork/snapchat" className="social-link">Snapchat</Link>
        <Link to="/socialnetwork/telegram" className="social-link">Telegram</Link>
      </div>

      {/* Iframe for WhatsApp web */}
      <iframe
        title="WhatsApp Web"
        src="https://web.whatsapp.com/"
        width="400px" 
        height="600px" 
        frameBorder="0"
        allowFullScreen
      />

      {/* Iframe for Instagram */}
      <iframe
        title="Instagram"
        src="https://www.instagram.com/"
        width="400px"
        height="600px"
        frameBorder="0"
        allowFullScreen
      />

       {/* Iframe for Snapchat */}
       <iframe
        title="Snapchat"
        src="https://www.snapchat.com/"
        width="400px"
        height="600px"
        frameBorder="0"
        allowFullScreen
      />

       {/* Iframe for Telegram */}
       <iframe
        title="Telegram"
        src="https://web.telegram.org/"
        width="400px"
        height="600px"
        frameBorder="0"
        allowFullScreen
      />  

    </div>
  );
};

export default SocialNetwork;
