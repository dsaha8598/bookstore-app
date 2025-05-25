import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img src="images/book-nest-logo.png" alt="Logo" className="loader-logo" />
        <div className="loader-ring"></div>
      </div>
    </div>
  );
};

export default Loader;
