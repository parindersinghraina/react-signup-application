// App.tsx
import React from 'react';
import SignUp from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import WorldClock from './components/WorldClock';
import MortgageCalculator from './components/MortgageCalculator';
import ProductDetection from './components/ProductDetection';
import SocialNetwork from './components/SocialNewtwork';
import SearchProduct from './components/SearchProduct';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header /> 
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="container">
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path ="/dashboard" element={<Dashboard />} />
            <Route path ="/worldclock" element={<WorldClock timezone={'EST'} />} />
            <Route path ="/mortgagecalculator" element={<MortgageCalculator />} />
            <Route path ="/productdetection" element={<ProductDetection />} />
            <Route path = "/socialnetwork" element={<SocialNetwork />} />
            <Route path ="/searchproduct" element={<SearchProduct />} />

            {/* Redirects */}
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" />} />
            <Route path="/worldclock/*" element={<Navigate to="/dashboard/worldclock" />} />
            <Route path="/mortgagecalculator/*" element={<Navigate to="/dashboard/mortgagecalculator" />} />
            <Route path="/productdetection/*" element={<Navigate to="/dashboard/productdetection" />} />
            <Route path="/socialnetwork/*" element={<Navigate to="/dashboard/socialnetwork" />} />
            <Route path="/searchproduct/*" element={<Navigate to="/dashboard/searchproduct" />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
