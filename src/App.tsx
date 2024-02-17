import React from 'react';
import SignUp from './components/SignUpForm';
import Login from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Our Application</h1>
      <SignUp />
      <Login />
    </div>
  );
};

export default App;
