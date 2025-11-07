import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiEye } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext"; // ✅ fixed import
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

// Assets
import google from "../assets/google.png";
import card from "../assets/vcart logo.png";

function Registration() {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(AuthContext);
  const { getCurrentUser } = useContext(UserContext); // ✅ fixed usage
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password Signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      console.log("Registered user:", result.data);
      await getCurrentUser(); // ✅ refresh context
      navigate("/"); // redirect after signup
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // Google Signup
  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName;
      const email = user.email;

      const response = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );

      console.log(response.data);
      await getCurrentUser(); // ✅ refresh context
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Header */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-6 gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[45px]" src={card} alt="OneCart Logo" />
        <h1 className="text-[22px] font-semibold">OneCart</h1>
      </div>

      {/* Title */}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <p className="text-sm text-gray-300">
          Welcome to OneCart, place your order now 🚀
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-[600px] sm:max-w-[400px] w-[90%] min-h-[500px] mt-6 bg-black/30 border border-gray-600/30 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center p-6">
        <form
          onSubmit={handleSignUp}
          className="w-full flex flex-col items-center gap-4"
        >
          {/* Google Register */}
          <div
            className="w-full h-[50px] bg-white text-black rounded-lg flex items-center justify-center gap-3 font-medium shadow cursor-pointer hover:bg-gray-100"
            onClick={googleSignup}
          >
            <img src={google} alt="Google" className="w-[20px]" />
            Register with Google
          </div>

          {/* Divider */}
          <div className="w-full flex items-center gap-2 text-gray-400 my-2">
            <div className="flex-1 h-[1px] bg-gray-500/40"></div>
            OR
            <div className="flex-1 h-[1px] bg-gray-500/40"></div>
          </div>

          {/* Input Fields */}
          <input
            type="text"
            className="w-full h-[50px] border border-gray-400/40 rounded-lg shadow bg-transparent placeholder:text-gray-300 px-4 font-normal focus:border-indigo-400 outline-none"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          {/* Submit Button */}
          <button className="w-full h-[50px] bg-indigo-500 hover:bg-indigo-600 transition rounded-lg text-[17px] font-semibold mt-3 shadow">
            Register Account
          </button>

          {/* Login Link */}
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-indigo-400 hover:underline cursor-pointer font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
