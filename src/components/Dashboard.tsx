// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import './Dashboard.css';

interface UserCountResponse {
  count: number;
}

const Dashboard: React.FC = () => {
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
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="user-count">Total Users: {userCount !== null ? userCount : 'Loading...'}</p>

      {/* Show confetti when showConfetti is true */}
      {showConfetti && <Confetti />}

      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
