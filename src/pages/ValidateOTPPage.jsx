import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const ValidateOTPPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, userName, flow } = location.state || {};

  const [otp, setOtp] = useState('');
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect to SignUpPage if missing required data (e.g., on page refresh)
  useEffect(() => {
    if (!email || !userName || !flow) {
      navigate('/signup', { replace: true });
    }
  }, [email, userName, flow, navigate]);

  const validateOtp = (value) => {
    const isValid = /^\d{6}$/.test(value);
    setIsValidOtp(isValid);
    setOtp(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg('');

    try {

      const response = await fetch('http://localhost:8080/user/validateEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, otp, flow }),
      });

      if (response.status === 200) {
        if (flow === 'account-creation') {
          alert('Account has been created. Please continue to log in.');
          navigate('/welcome/createstore');
        } else {
          // Forgot password flow → navigate to password update page
          navigate('/update/password', {
            state: { userName, email },
          });
        }
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
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center space-y-6">
        {/* Logo */}
        <img
          src="images/book-nest-logo.png"
          alt="Book Nest Logo"
          className="h-14 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate('/')}
        />

        <h2 className="text-3xl font-extrabold text-blue-700 text-center">Verify OTP</h2>
        <p className="text-center text-gray-600 text-sm">
          OTP has been sent to your email <br />
          <span className="font-semibold text-gray-800">{email}</span>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => validateOtp(e.target.value)}
          maxLength={6}
          className="w-full text-center px-4 py-2 border border-gray-300 rounded-md text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {errorMsg && (
          <div className="w-full text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
            {errorMsg}
          </div>
        )}

        <button
          className={`w-full py-2 rounded-md text-white text-lg font-semibold transition-colors duration-300 ${
            isValidOtp
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isValidOtp || loading}
          onClick={handleSubmit}
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ValidateOTPPage;
