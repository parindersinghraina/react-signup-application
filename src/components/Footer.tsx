import React from 'react';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; 2024 <a href="https://github.com/parindersinghraina" target="_blank" rel="noopener noreferrer">@parindersinghraina</a>. All rights reserved.</p>
      <div>
        <a href="https://github.com/parindersinghraina" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        {' | '}
        <a href="https://www.linkedin.com/in/parindersinghraina/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
        {' | '}
        <a href="https://www.youtube.com/@PindoholicTech" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

