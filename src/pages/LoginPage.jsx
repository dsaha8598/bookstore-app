import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import Loader from '../components/Loader';

const LoginPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isNameValid, setIsNameValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const validateName = (value) => {
    const valid = /^[a-zA-Z0-9]{3,}$/.test(value);
    setIsNameValid(valid);
    setName(value);
  };

  const validatePassword = (value) => {
    const valid = value.length >= 6;
    setIsPasswordValid(valid);
    setPassword(value);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.status === 200) {
        navigate('/welcome/storeoption');
      } else {
        const errorData = await response.json();
        setError(`${errorData.errorMsg} - ${errorData.developerErrorMsg}`);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = isNameValid && isPasswordValid;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center space-y-6">
        {/* Logo */}
        <img
          src="images/book-nest-logo.png"
          alt="Book Nest Logo"
          className="h-14 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate('/')}
        />

        <h2 className="text-2xl font-bold text-blue-700">Log in to your account</h2>

        <div className="w-full relative">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => validateName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isNameValid !== null && (
            <div className="absolute top-2 right-2 flex items-center">
              {isNameValid ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </div>
          )}
          {!isNameValid && isNameValid !== null && (
            <p className="text-sm text-red-500 mt-1">Username must be at least 3 characters long.</p>
          )}
        </div>

        <div className="w-full relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isPasswordValid !== null && (
            <div className="absolute top-2 right-2 flex items-center">
              {isPasswordValid ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </div>
          )}
          {!isPasswordValid && isPasswordValid !== null && (
            <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters long.</p>
          )}
        </div>

        {error && (
          <div className="w-full text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
            {error}
          </div>
        )}

        <button
          className={`w-full py-2 rounded-md text-white text-lg font-semibold transition-colors duration-300 ${
            isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isFormValid || loading}
          onClick={handleLogin}
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : 'Log In'}
        </button>

        <div className="w-full text-right">
          <button className="text-sm text-blue-600 hover:underline" onClick={() =>  navigate('/forgot/password')}>
            Forgot Password?
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Click here to register
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
