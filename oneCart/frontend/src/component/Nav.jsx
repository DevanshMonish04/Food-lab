import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import vcart from "../assets/vcart logo.png";
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { BsCollectionFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const { getCurrentUser, userData } = useContext(UserContext);
  const { serverUrl } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <>
      {/* Top Nav */}
      <div className="w-full fixed top-0 left-0 h-[70px] bg-black/30 backdrop-blur-md flex items-center justify-between px-6 shadow-lg border-b border-gray-700/40 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={vcart} alt="OneCart Logo" className="w-[45px] h-[45px] object-contain drop-shadow-lg" />
          <h1 className="text-2xl font-bold text-white tracking-wide">OneCart</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center justify-center gap-6 text-white font-medium">
          {["HOME", "COLLECTIONS", "ABOUT", "CONTACT"].map((item) => (
            <li
              key={item}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-indigo-500 transition cursor-pointer"
              onClick={() => navigate(`/${item.toLowerCase()}`)}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-white">
          {/* Search */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer transition"
            onClick={() => setShowSearch(prev => !prev)}
          >
            <FaSearch className="w-5 h-5" />
          </div>

          {/* User / Initials */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer transition"
            onClick={() => setShowProfile(prev => !prev)}
          >
            {!userData ? (
              <FaCircleUser className="w-5 h-5" />
            ) : (
              <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center">
                {userData?.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer transition">
            <FaCartPlus className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[10px]">
              10
            </span>
          </div>
        </div>

        {/* Search Box */}
        {showSearch && (
          <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center">
            <input
              type="text"
              className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-4 md:px-[50px] placeholder:text-white text-white text-[18px]"
              placeholder="Search here"
            />
          </div>
        )}

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaaa9a9] rounded-[10px] z-50">
            <ul className="w-full h-full flex flex-col justify-start text-[17px] py-[10px] text-white">
              {!userData && (
                <li
                  className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setShowProfile(false);
                  }}
                >
                  Login
                </li>
              )}
              {userData && (
                <li
                  className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              )}
              <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer">
                Orders
              </li>
              <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer">
                About
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Nav (Mobile Only) */}
      <div className="w-full h-[90px] flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#191818] block md:hidden z-50">
        <button className="flex flex-col items-center gap-1 text-white" onClick={() => navigate("/")}>
          <IoMdHome className="w-6 h-6" />Home
        </button>
        <button className="flex flex-col items-center gap-1 text-white" onClick={() => navigate("/collections")}>
          <BsCollectionFill className="w-6 h-6" />Collection
        </button>
        <button className="flex flex-col items-center gap-1 text-white" onClick={() => navigate("/contact")}>
          <MdContacts className="w-6 h-6" />Contact
        </button>
        <button className="flex flex-col items-center gap-1 text-white" onClick={() => navigate("/cart")}>
          <FaCartPlus className="w-6 h-6" />Cart
        </button>
      </div>
    </>
  );
}

export default Nav;
