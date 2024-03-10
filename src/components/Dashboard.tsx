// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import './Dashboard.css';
import { useWindowSize } from 'react-use';
import WorldClock from './WorldClock';


interface UserCountResponse {
  count: number;
}

const welcomeVideo = '/welcome.mp4';

const Dashboard: React.FC = () => {
  const { width, height } = useWindowSize();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get<UserCountResponse>('http://localhost:5001/api/usercount');
        setUserCount(response.data.count);

        // Check if login was successful and show confetti
        const showConfettiValue = localStorage.getItem('showConfetti');
        const loggedIn = showConfettiValue === 'true';

        if (loggedIn) {
          // Reset the showConfetti value in local storage
          localStorage.setItem('showConfetti', 'false');

          // Set showConfetti state to true
          setShowConfetti(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCount();
  }, []);

  return (     
    <div className="dashboard-container">
      <video autoPlay muted loop className="dashboard-video">
        <source src={welcomeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Show confetti when showConfetti is true */}
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default Dashboard;
