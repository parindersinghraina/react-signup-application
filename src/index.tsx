import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main App component
import './index.css'; // Import your global styles

ReactDOM.render(
  <React.StrictMode>
    <div style={{ backgroundColor: '#f0f0f9', minHeight: '500px' }}>
      {/* Apply background color directly to the root element */}
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
