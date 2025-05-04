import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter a name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      console.log('Response:', response.data);

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify({ name }));
        console.log('Saved user to localStorage:', { name });
        navigate('/dashboard');
      } else if (response.data && response.data.message) {
        setError(response.data.message);
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded-md bg-[#f9fafb] px-7 py-10 shadow-lg"> {/* Light neutral background */}
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-[#4b5563]">Sign Up</h4> {/* Dark neutral text */}

            <input
              type="text"
              placeholder="Name"
              className="input-box bg-[#f3f4f6] border-[#d1d5db]" // Light gray background with soft gray border
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box bg-[#f3f4f6] border-[#d1d5db]" // Light gray background with soft gray border
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary bg-[#60a5fa] hover:bg-[#3b82f6] cursor-pointer"> {/* Soft blue button with hover effect */}
              Create Account
            </button>

            <p className="text-sm text-center mt-4 text-[#6b7280]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#3b82f6] underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
