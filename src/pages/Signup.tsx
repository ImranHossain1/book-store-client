/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSignupUserMutation } from '@/redux/features/users/userApi';
import { createUser } from '@/redux/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
  const [
    userDb,
    { isSuccess, isLoading: databaseLoading, data, isError, error },
  ] = useSignupUserMutation();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);
  const [role, setRole] = useState('reader');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
    email: '',
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
    email: '',
  });

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields
    const errors = validateForm();
    if (hasErrors(errors)) {
      return;
    }

    const { firstName, lastName, address, phone, password, email } = formData;
    const options = {
      data: {
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        address: address,
        phoneNumber: phone,
        password: password,
        role: role,
        email: email,
      },
    };
    userDb(options);
    dispatch(createUser({ email: email, password: password }));
  };

  useEffect(() => {
    if (isSuccess === true) {
      toast.success('Sign Up Successfully!');

      // Store refreshToken in cookies after successful signup
      if (data?.data?.accessToken) {
        Cookies.set('refreshToken', data.data.accessToken, { expires: 7 });
      }
      // Reset the input fields
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        password: '',
        email: '',
      });
      navigate('/');
    }
    if (isError === true) {
      if (error) {
        toast.error('An error occurred during sign-in.');
      }
    }
  }, [isSuccess, isError, error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      password: '',
      email: '',
    };

    if (!formData.firstName) {
      errors.firstName = 'First Name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required.';
    }
    if (!formData.email) {
      errors.email = 'Email is required.';
    }
    if (!formData.address) {
      errors.address = 'Address is required.';
    }
    if (!formData.phone) {
      errors.phone = 'Phone Number is required.';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFormErrors(errors);

    return errors;
  };

  const hasErrors = (errors: {
    [x: string]: any;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    password?: string;
    email?: string;
  }) => {
    for (const field in errors) {
      if (errors[field]) {
        return true;
      }
    }
    return false;
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
          SIGN UP
        </h2>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">First Name</span>
          </label>
          <input
            name="firstName"
            type="text"
            onChange={handleInputChange}
            placeholder="Enter Your First Name"
            className="input select-secondary w-full"
            value={formData.firstName}
          />
          {formErrors.firstName && (
            <p className="text-red-500 mt-2">{formErrors.firstName}</p>
          )}
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Last Name</span>
          </label>
          <input
            name="lastName"
            type="text"
            onChange={handleInputChange}
            placeholder="Enter Your Last Name"
            className="input select-secondary w-full"
            value={formData.lastName}
          />
          {formErrors.lastName && (
            <p className="text-red-500 mt-2">{formErrors.lastName}</p>
          )}
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            className="input select-secondary w-full"
            value={formData.email}
          />
          {formErrors.email && (
            <p className="text-red-500 mt-2">{formErrors.email}</p>
          )}
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Address</span>
          </label>
          <input
            name="address"
            type="text"
            onChange={handleInputChange}
            placeholder="Enter Your Address"
            className="input select-secondary w-full"
            value={formData.address}
          />
          {formErrors.address && (
            <p className="text-red-500 mt-2">{formErrors.address}</p>
          )}
        </div>
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">Address</span>
          </label>
          <select
            className="select select-secondary w-full"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="reader">Reader</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text font-semibold">
              Enter Your Phone Number
            </span>
          </label>
          <input
            name="phone"
            type="number"
            onChange={handleInputChange}
            placeholder="Enter Your Phone Number"
            className="input select-secondary w-full"
            value={formData.phone}
          />
          {formErrors.phone && (
            <p className="text-red-500 mt-2">{formErrors.phone}</p>
          )}
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
          {formErrors.password && (
            <p className="text-red-500 mt-2">{formErrors.password}</p>
          )}
        </div>
        <div className="form-control w-full mt-6">
          <button className="btn btn-active bg-blue-800 hover:bg-blue-600 text-white">
            Sign Up
          </button>
        </div>
        <div className="form-control w-full mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/signIn" className="text-blue-800 underline">
            Please Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
