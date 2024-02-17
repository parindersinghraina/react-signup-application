// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess = () => {} }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Validate input fields (add more validation as needed)

      // Make API request to login endpoint
      const response = await axios.post('http://localhost:5001/api/login', { username, password }, { withCredentials: true });

      // Handle successful login
      console.log(response.data);
      onLoginSuccess();
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
