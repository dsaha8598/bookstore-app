import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';

const CreateStoreOnWelcome = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get dynamic name from location state or fallback to empty
  const userName = location.state?.userName || 'User';

  const handleCreateStore = () => {
    setLoading(true);

    // Simulating an API delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
      navigate('/store/multistep');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-10 text-center space-y-6">
        
        {/* Logo */}
        <img
          src="images/book-nest-logo.png"
          alt="Book Nest Logo"
          className="h-14 mx-auto cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate('/')}
        />

        {/* Welcome Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          <span className="text-blue-600">Welcome</span> to BookNest <span className="text-blue-600">{userName}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 text-base md:text-lg">
          Congratulations on completing the first step of your journey. <br />
          Let’s get started by <span className="text-blue-600 font-semibold">setting up your store</span>.
        </p>

        {/* Store Image */}
        <img
          src="images/store.jpg"
          alt="Store Illustration"
          className="w-full max-h-64 object-contain rounded-md shadow-md"
        />

        {/* Create Store Button */}
        <button
          onClick={handleCreateStore}
          disabled={loading}
          className={`w-full mt-4 py-3 text-white text-lg font-medium rounded-lg transition-colors ${
            loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? <Loader className="mx-auto" /> : 'Create My First Store'}
        </button>
      </div>
    </div>
  );
};

export default CreateStoreOnWelcome;
