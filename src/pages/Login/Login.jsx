import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      console.log("Login Response:", response.data); // 👈 Check the key name

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify({ name: response.data.fullName }));

        navigate('/dashboard');
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      if (error.response?.data?.message) {
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
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-[#4b5563]">Login</h4> {/* Neutral text color */}

            <input
              type="text"
              placeholder="Email"
              className="input-box bg-[#f3f4f6] border-[#d1d5db]" // Subtle gray background with soft gray border
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary bg-[#60a5fa] hover:bg-[#3b82f6] cursor-pointer"> {/* Soft blue button with hover effect */}
              Login
            </button>

            <p className="text-sm text-center mt-4 text-[#6b7280]">
              Not registered yet?{' '}
              <Link to="/signUp" className="font-medium text-[#3b82f6] underline">Create an Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
