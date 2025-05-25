/* File: src/pages/SignupPage.jsx */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaBolt, FaPercent, FaChartLine,
  FaThumbsUp, FaTimes
} from 'react-icons/fa';
import Loader from '../components/Loader';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userName: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [popupError, setPopupError] = useState(null);
  const navigate = useNavigate();

  const validate = (field, value) => {
    switch (field) {
      case 'fullname':
        return value.trim().length >= 3 ? '' : 'Full name must be at least 3 characters';
      case 'userName':
        return value.trim().length >= 3 ? '' : 'User name must be at least 3 characters';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
      case 'phone':
        return /^\d{10}$/.test(value) ? '' : 'Phone must be 10 digits';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const isFormValid =
    Object.values(errors).every((err) => err === '') &&
    Object.values(formData).every((val) => val !== '') &&
    termsAccepted;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isFormValid) return;

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.userName,
          fullName: formData.fullname,
          email: formData.email,
          number: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.email) {
        navigate('/validate/otp', { state: { email: result.email,  userName: result.userName, flow: 'account-creation' } });
      } else {
        setPopupError({
          errorMsg: result.errorMsg || 'Registration failed',
          developerErrorMsg: result.developerErrorMsg || '',
        });
      }
    } catch (error) {
      setPopupError({
        errorMsg: 'Network error',
        developerErrorMsg: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const SignUpSection = () => {
     return (
    <div className="bg-[#e8f0ff] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white max-w-4xl w-full rounded-md shadow-md p-6 md:p-12 flex flex-col md:flex-row md:justify-between relative">

        <div className="absolute top-4 left-4 md:static mb-4 md:mb-0">
          <img src="images/book-nest-logo.png" alt="Logo" className="w-60 h-30 object-contain mr-1 -mt-2 -ml-2" />
        </div>

        <div className="absolute top-4 right-4 md:static text-xs text-gray-600">
          Already using?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>

        <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
          <h1 className="font-extrabold text-3xl leading-tight mb-6 mt-16 md:mt-0">
            Create an<br />account
          </h1>
          <ul className="space-y-4 text-gray-700 text-sm font-medium">
            <li className="flex items-start">
              <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 text-base" />
              <span>Secure payments through reliable partners</span>
            </li>
            <li className="flex items-center">
              <FaBolt className="text-blue-600 mr-3 text-base" />
              <span>Fast transfers</span>
            </li>
            <li className="flex items-center">
              <FaPercent className="text-blue-600 mr-3 text-base" />
              <span>Fair commissions</span>
            </li>
            <li className="flex items-center">
              <FaChartLine className="text-blue-600 mr-3 text-base" />
              <span>Best available rates</span>
            </li>
            <li className="flex items-center">
              <FaThumbsUp className="text-blue-600 mr-3 text-base" />
              <span>Convenience</span>
            </li>
          </ul>
        </div>

        <form className="md:w-1/2 flex flex-col space-y-4" onSubmit={handleSubmit}>
          {['fullname', 'userName', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-xs text-gray-400 mb-1 capitalize">
                {field === 'confirmPassword' ? 'Confirm Password' : field.replace(/([A-Z])/g, ' $1')}
              </label>
              <div className="relative">
                <input
                  name={field}
                  id={field}
                  type={
                    field.toLowerCase().includes('password') ? 'password' :
                      field === 'email' ? 'email' :
                        field === 'phone' ? 'tel' :
                          'text'
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                    errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-blue-600 focus:ring-blue-600'
                  }`}
                />
                {touched[field] && (
                  errors[field]
                    ? <FaTimes className="text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    : <span className="absolute right-3 top-1/2 -translate-y-1/2">✅</span>
                )}
              </div>
              {errors[field] && touched[field] && (
                <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="flex items-start space-x-2 text-xs text-gray-400 mt-1">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-3 h-3 mt-1 accent-blue-700 cursor-pointer"
            />
            <label htmlFor="terms" className="select-none">
              I agree to our Terms of Service and{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`font-semibold text-sm rounded-md py-2 mt-2 transition-colors duration-200 ${
              isFormValid ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            Sign up
          </button>
        </form>
      </div>

      {popupError && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
          <strong className="font-bold">{popupError.errorMsg}</strong>
          <p className="text-sm mt-1">{popupError.developerErrorMsg}</p>
          <button onClick={() => setPopupError(null)} className="absolute top-1 right-1 text-red-500 hover:text-red-700">✖</button>
        </div>
      )}
    </div>

    );};

  return (
    <div>{loading ? <Loader /> : SignUpSection()}</div>
  );
};

export default SignupPage;
