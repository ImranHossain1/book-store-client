/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { loginUser } from '@/redux/features/users/userSlice';
import { useSigninUserMutation } from '@/redux/features/auth/login';
import toast from 'react-hot-toast';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [
    userDb,
    { isSuccess, isLoading: databaseLoading, data, error, isError },
  ] = useSigninUserMutation();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    if (!formData.email) {
      setPasswordError('');
      return 'Please enter your email.';
    }
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return '';
    }
    setPasswordError('');
    return '';
  };

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const { email, password } = formData;
    const options = {
      data: {
        email: email,
        password: password,
      },
    };
    userDb(options);
    dispatch(loginUser({ email: email, password: password }));
  };

  useEffect(() => {
    // Check if the accessToken exists in the response data
    if (data?.data?.accessToken) {
      // Add the accessToken to cookies with the name "refreshToken"
      Cookies.set('refreshToken', data.data.accessToken, { expires: 7 }); // Set the expiration date as needed
    }

    if (user.email && !isLoading && isSuccess) {
      toast.success('Logged in Successfully!');
      navigate(from, { replace: true });
    }
    if (isError === true) {
      if (error) {
        toast.error('An error occurred during sign-in.');
      }
    }
  }, [user.email, isLoading, data?.data?.accessToken, isError]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (isLoading || databaseLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-full md:my-12 my-8">
      <form
        onSubmit={handleCreateUser}
        className="w-10/12 md:w-4/12 mx-auto border p-3 md:p-8"
      >
        <h2 className="text-2xl text-center font-bold text-blue-800">
          Sign In
        </h2>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Enter Your Email</span>
          </label>
          <input
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="Enter Your Email Address"
            className="input select-secondary w-full"
            value={formData.email}
          />
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">
              Enter Your Password
            </span>
          </label>
          <input
            name="password"
            type="password"
            onChange={handleInputChange}
            placeholder="Enter Your Password"
            className="input select-secondary w-full"
            value={formData.password}
          />
          {passwordError && (
            <p className="text-red-500 mt-2">{passwordError}</p>
          )}
        </div>
        <div className="form-control w-full mt-6">
          <button className="btn btn-active bg-blue-800 hover:bg-blue-600 text-white">
            Sign In
          </button>
        </div>
        <div className="form-control w-full mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signUp" className="text-blue-800 underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
