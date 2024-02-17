// src/components/SignupForm.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Check if username or password is empty
    if (!username.trim() || !password.trim()) {
      console.error('Username and password cannot be empty');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/signup',
        { username, password },
        { withCredentials: true }
      );

      console.log('Axios response:', response.data);
      // Handle successful signup on the frontend if needed

      // Show success toast message
      toast.success('Signup successful!');
    } catch (error) {
      console.error('Axios error:', error);

      // Check if the error is an AxiosError and has a response with status 400
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // Show failed toast message
        toast.error('Signup failed. Please check your inputs.');
      } else {
        // Show a generic error message for other errors
        toast.error('An error occurred during signup. Please try again.');
      }
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
        <button
          type="button"
          onClick={handleSignup}
          style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}
        >
          Signup
        </button>
      </form>

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
