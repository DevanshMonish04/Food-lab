import React, { useState, useContext } from 'react';
import vcart from "../assets/vcart logo.png";
import { HiOutlineEye, HiEye } from "react-icons/hi";
import axios from "axios";
import { authDataContext } from '../context/AuthContext';   // ✅ import context

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { serverUrl } = useContext(authDataContext);

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/adminlogin',
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-[80px] flex items-center justify-start px-6 gap-3 cursor-pointer">
        <img className="w-[45px]" src={vcart} alt="OneCart Logo" />
        <h1 className="text-[22px] font-semibold">OneCart</h1>
      </div>

      {/* Title */}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold">Login Page</h2>
        <p className="text-sm text-gray-300">
          Welcome to OneCart, Apply to Admin Login
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-[600px] sm:max-w-[400px] w-[90%] min-h-[450px] sm:min-h-[500px] mt-6 bg-black/30 border border-gray-600/30 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center p-6">
        <form onSubmit={adminLogin} className="w-full flex flex-col items-center gap-4">
          <input
            type="email"
            className="w-full h-[50px] border border-gray-400/40 rounded-lg shadow bg-transparent placeholder:text-gray-300 px-4 font-normal focus:border-indigo-400 outline-none"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              className="w-full h-[50px] border border-gray-400/40 rounded-lg shadow bg-transparent placeholder:text-gray-300 px-4 font-normal focus:border-indigo-400 outline-none"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <HiEye
                onClick={() => setShow(!show)}
                className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <HiOutlineEye
                onClick={() => setShow(!show)}
                className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>

          <button className="w-full h-[50px] bg-indigo-500 hover:bg-indigo-600 transition rounded-lg text-[17px] font-semibold mt-3 shadow">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
