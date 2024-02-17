import React from 'react';
import SignUp from './components/SignUpForm';
import Login from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to React Sign Up & Login Application</h1>
      <SignUp />
      <Login />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Make the container take the full height of the viewport
    background: '#f0f0f0', // Set a background color
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default App;
