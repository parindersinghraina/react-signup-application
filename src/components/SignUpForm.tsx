// SignUpForm.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

      // Show a success toast message
      toast.success('Signup successful! Please login.', {
        onClose: () => {
          // Navigate to the login page after the toast message disappears
          navigate('/login');
        },
      });
        
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
    // Navigate to the login page on successful signup
    // navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <label className="form-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </label>
        <br />
        <button
          type="button"
          onClick={handleSignup}
          className="submit-button"
        >
          Signup
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <a href="/login" className="link">
          Login
        </a>
      </p>

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
