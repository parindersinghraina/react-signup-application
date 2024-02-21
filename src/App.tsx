// App.tsx
import React from 'react';
import SignUp from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

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
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
