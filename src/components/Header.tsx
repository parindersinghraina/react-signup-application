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

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  // Check if the current location is one of the specified paths
  const isDashboard = location.pathname === '/dashboard';
  const isWorldClock = location.pathname === '/worldclock';
  const isMortgageCalculator = location.pathname === '/mortgagecalculator';
  const isProductDetection = location.pathname === '/productdetection';
  const isBanking = location.pathname === '/banking';
  const isHoliday = location.pathname === '/holiday';
  const isWeather = location.pathname === '/weather';

  return (
    <div className="header-container">
      {isAuthenticated && (
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
          <div className={`tab${location.pathname === '/productdetection' ? ' active' : ''}`}>
            <button className="tab-button" onClick={() => navigateTo('/productdetection')}>
              Product Detector
            </button>
          </div>
          <div className={`tab${location.pathname === '/banking' ? ' active' : ''}`}>
            <button className="tab-button" onClick={() => navigateTo('/banking')}>
               Banking
            </button>
          </div>
          <div className={`tab${location.pathname === '/searchproduct' ? ' active' : ''}`}>
            <button className="tab-button" onClick={() => navigateTo('/searchproduct')}>
              Search Product
            </button>
          </div>
          <div className={`tab${location.pathname === '/holiday' ? ' active' : ''}`}>
            <button className="tab-button" onClick={() => navigateTo('/holiday')}>
              Holiday
            </button>
          </div>
          <div className={`tab${location.pathname === '/weather' ? ' active' : ''}`}>
            <button className="tab-button" onClick={() => navigateTo('/weather')}>
              Weather
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && (isDashboard || isWorldClock || isMortgageCalculator || isProductDetection || isBanking || isHoliday || isWeather)  && (
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
