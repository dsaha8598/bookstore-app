import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = location.state || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!userName) {
      navigate('/login');
    }
  }, [userName, navigate]);

  const validateInputs = () => {
    const newErrors = {};

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = validateInputs();
    setIsFormValid(isValid);
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    setLoading(true);
    setApiError('');

    try {
      const response = await fetch('http://localhost:8080/user/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
          confirmPassword,
        }),
      });

      if (response.status === 200) {
        alert('Password got updated.');
        navigate('/login');
      } else {
        const error = await response.json();
        setApiError(`${error.errorMsg} - ${error.developerErrorMsg}`);
      }
    } catch (err) {
      setApiError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center space-y-6">
        <img
          src="images/book-nest-logo.png"
          alt="Book Nest Logo"
          className="h-14 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate('/')}
        />

        <h2 className="text-2xl font-bold text-blue-700 text-center">Update Password</h2>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <div className="relative">
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span className="absolute top-3 right-3 text-xl">
              {errors.password ? '❌' : password && '✅'}
            </span>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
            <span className="absolute top-3 right-3 text-xl">
              {errors.confirmPassword ? '❌' : confirmPassword && '✅'}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {apiError && (
          <div className="w-full text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
            {apiError}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className={`w-full py-2 rounded-md text-white text-lg font-semibold transition-colors duration-300 ${
            isFormValid && !loading
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : 'Update Password'}
        </button>

        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
