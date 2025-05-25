import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUserNameChange = (value) => {
    const trimmed = value.trim();
    setUserName(trimmed);
    setIsValid(trimmed.length >= 3); // Simple validation: length >= 3
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(
        `http://localhost:8080/user/forgotPassword?userName=${userName}`,
        { method: 'GET' }
      );

      if (response.status === 200) {
        const data = await response.json();
        navigate('/validate/otp', { state: { email: data.email, userName: data.userName, flow: 'forgot-password' } });
      } else {
        const error = await response.json();
        setErrorMsg(`${error.errorMsg} - ${error.developerErrorMsg}`);
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-blue-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-4 cursor-pointer" onClick={() => navigate('/')}>
          <img src="images/book-nest-logo.png" alt="Logo" className="h-12" />
        </div>

        {/* Back button */}
        <button
          className="flex items-center text-blue-600 hover:underline mb-4"
          onClick={() => navigate('/login')}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Login
        </button>

        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your username to receive an OTP on your registered email.
        </p>

        {/* Username input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => handleUserNameChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute top-2.5 right-3">
            {userName && (
              isValid ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )
            )}
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {errorMsg}
          </div>
        )}

        {/* Submit Button */}
        <button
          className={`w-full py-2 text-lg font-semibold rounded-lg transition-colors ${
            isValid && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
          disabled={!isValid || loading}
          onClick={handleSubmit}
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : 'Send OTP'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
