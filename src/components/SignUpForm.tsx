// src/components/SignupForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Example in SignupForm.tsx
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/signup',
        { username, password },
        { withCredentials: true }
      );
  
      console.log('Axios response:', response.data);
      // Handle successful signup on the frontend if needed
    } catch (error) {
      console.error('Axios error:', error);
      // Handle errors on the frontend if needed
    }
  };
  
  
  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
