// SignUpForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';


const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const validateEmail = (email: string): boolean => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    // Check if username, email, or password is empty
    if (!username.trim() || !email.trim() || !password.trim()) {
      console.error('Username, email, and password cannot be empty');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.error('Invalid email format');
      toast.error('Invalid email format. Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/api/signup',
        { username, email, password },
        { withCredentials: true }
      );

      console.log('Axios response:', response.data);

      toast.success('Signup successful! You can now login.', {
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
  };
   // Toggle password visibility
   const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className="form-label">
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-input"
            />
          <br/ >
          </label>
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
