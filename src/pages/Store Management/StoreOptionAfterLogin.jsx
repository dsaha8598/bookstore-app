import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const StoreOptionAfterLogin = ({ userName }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/stores?userName=${userName}`);
        const data = await response.json();
        const storeList = Array.isArray(data) ? data : data.stores || [];
        setStores(storeList);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
        setErrorMsg('Failed to fetch stores. Please try again later.');
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [userName]);

  const handleContinue = () => {
    if (selectedStore) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {loading && <Loader />}
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
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
      <select
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-64 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="" disabled>Select a store</option>
        {Array.isArray(stores) && stores.length > 0 ? (
          stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))
        ) : (
          <option disabled>No stores available</option>
        )}
      </select>
      <button
        onClick={handleContinue}
        disabled={!selectedStore}
        className={`px-6 py-2 rounded text-white font-semibold ${
          selectedStore ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default StoreOptionAfterLogin;