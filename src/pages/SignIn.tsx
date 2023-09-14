import { useSignInUserMutation } from '@/redux/features/users/authApi';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { loginUser } from '@/redux/features/users/userSlice';
const SignIn = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    const options = {
      data: {
        email: email,
        password: password,
      },
    };
    dispatch(loginUser({ email: email, password: password }));
  };
  //console.log(data?.data?.accessToken);
  useEffect(() => {
    if (user.email && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user.email, isLoading]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
        <p className="ml-2 text-blue-500">Loading...</p>
      </div>
    );
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    return;
  };
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
        </div>
        <div className="form-control w-full mt-6">
          <button className="btn btn-active bg-blue-800 hover:bg-blue-600 text-white">
            Add Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
