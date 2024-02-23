// Header.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="header-container">
      <div className="tabs-container">
        <div className={`tab${location.pathname === '/dashboard' ? ' active' : ''}`}>
          <button className="tab-button" onClick={() => navigateTo('/dashboard')}>
            Dashboard
          </button>
        </div>
        <div className={`tab${location.pathname === '/worldclock' ? ' active' : ''}`}>
          <button className="tab-button" onClick={() => navigateTo('/worldclock')}>
            World Clock
          </button>
        </div>
        <div className={`tab${location.pathname === '/mortgagecalculator' ? ' active' : ''}`}>
          <button className="tab-button" onClick={() => navigateTo('/mortgagecalculator')}>
            Mortgage Calculator
          </button>
        </div>
      </div>
      {location.pathname === ('/dashboard') && (
        <div className="logout-button-container">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
