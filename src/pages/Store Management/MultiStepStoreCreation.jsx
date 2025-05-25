import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
const MultiStepStoreCreation = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    storeDescription: '',
    storeAddress: '',
    phoneNumber: '',
    email: '',
    storeImage: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRegisterStore = async () => {
    setLoading(true);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formPayload.append(key, value);
      });

      const response = await fetch('/api/store/register', {
        method: 'POST',
        body: formPayload,
      });

      setLoading(false);

      if (response.ok) {
        alert('Store registered successfully!');
        navigate('/dashboard');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Store registration failed.'}`);
      }
    } catch (err) {
      setLoading(false);
      alert('An unexpected error occurred.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
              Let's start with <span className="text-blue-600">Store Information</span>
            </h2>
            <input
              type="text"
              name="storeName"
              placeholder="Enter store name"
              value={formData.storeName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md mt-4"
            />
            <textarea
              name="storeDescription"
              placeholder="Description about your store (optional)"
              value={formData.storeDescription}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md mt-4"
            />
            <button
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-700"
            >
              Continue
            </button>
          </>
        );
      case 2:
        return (
          <>
            <button onClick={() => setStep(1)} className="text-blue-600 mb-2 text-left">← Back</button>
            <input
              type="text"
              name="storeAddress"
              placeholder="Enter store address"
              value={formData.storeAddress}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md mt-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Provide your email (optional)"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md mt-4"
            />
            <button
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-700"
            >
              Continue
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button onClick={() => setStep(2)} className="text-blue-600 mb-2 text-left">← Back</button>
            <label className="block text-gray-700 mb-2">Upload Store Image</label>
            <input
              type="file"
              name="storeImage"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
            />
            <button
              onClick={handleRegisterStore}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <Loader /> : 'Register My Store'}
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
        <img
          src="images/book-nest-logo.png"
          alt="Book Nest Logo"
          className="h-14 mx-auto cursor-pointer"
          onClick={() => navigate('/')}
        />

        <img
          src="images/store.jpg"
          alt="Store"
          className="w-full max-h-64 object-contain rounded-md shadow-md"
        />

        {renderStepContent()}
      </div>
    </div>
  );
};

export default MultiStepStoreCreation;
