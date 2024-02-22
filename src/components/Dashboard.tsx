import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import './Dashboard.css';
import { useWindowSize } from 'react-use';
import WorldClock from './WorldClock';
import InstagramPost from './InstagramPosts'; // Import the InstagramPost component

interface UserCountResponse {
  count: number;
}

const Dashboard: React.FC = () => {
  const { width, height } = useWindowSize();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]); // Assuming you have an array of Instagram posts

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

    const fetchInstagramPosts = async () => {
      try {
        // Fetch Instagram posts data from your API
        const response = await axios.get('http://localhost:5001/api/instagram/posts');
        setInstagramPosts(response.data.posts); // Assuming your API returns an array of posts
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCount();
    fetchInstagramPosts(); // Fetch Instagram posts when the component mounts
  }, []);

  return (
    <div className="dashboard-container">
      <WorldClock timezone="EST" />
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="user-count">Total Users: {userCount !== null ? userCount : 'Loading...'}</p>

      {/* Render Instagram posts */}
      <div className="instagram-posts">
        {instagramPosts.map((post, index) => (
          <InstagramPost key={index} post={post} />
        ))}
      </div>

      {/* Show confetti when showConfetti is true */}
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default Dashboard;
