"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    dp: '',
    info: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    const res = await fetch(`/api/users/register`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Registered Successfully");
      window.location.href = "/login";
      console.log(formData);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between px-96 bg-red-50">
        <div className="mainhead pt-28 pb-36">
          <div className="text-6xl font-bold pb-5">Register</div>
        </div>
        <div className="img">
          <img src="contact.png" alt="Contact" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white px-8 py-6 rounded-lg shadow-lg mx-96 my-10">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">
            Zip Code:
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dp" className="block text-gray-700 text-sm font-bold mb-2">
            Display Picture URL:
          </label>
          <input
            type="text"
            id="dp"
            name="dp"
            value={formData.dp}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="info" className="block text-gray-700 text-sm font-bold mb-2">
            User Info:
          </label>
          <textarea
            id="info"
            name="info"
            value={formData.info}
            onChange={handleChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500000000 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
