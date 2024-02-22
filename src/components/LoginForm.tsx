// LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if username or password is empty
    if (!username.trim() || !password.trim()) {
      console.error('Username and password cannot be empty');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/login',
        { username, password },
        { withCredentials: true }
      );

      console.log('Axios response:', response.data);

      // Check if the user is verified
      if (response.data.verified === true) {
        // Navigate to the dashboard on successful login
        navigate('/dashboard');

        // Show success toast message
        toast.success('Login successful!');

        // Set showConfetti to true in local storage
        localStorage.setItem('showConfetti', 'true');
      } 
    } catch (error) {
      console.error('Axios error:', error);

      // Check if the error is an AxiosError and has a response with status 401
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Show failed toast message
        toast.error('Invalid username or password. Please try again.');

      } else {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          // Show a toast message indicating that the user is not verified
          toast.error('Account not verified. Please check your email for verification.');
        } else {
          // Show a generic error message for other errors
          toast.error('An error occurred during login. Please try again.');
        }
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          {/* Eye icon to toggle password visibility */}
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            className="eye-icon"
          />
        </label>
        <br />
        <button
          type="button"
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </button>
      </form>

      {/* Link to navigate to the signup page */}
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>

      {/* Toast container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
