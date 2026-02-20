import React, { useEffect, useState, useContext } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ openModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      openModal();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/60 dark:bg-black/60 backdrop-blur-md">
        <div className="flex justify-between items-center px-4 py-3">

          <h1
            className="text-black dark:text-white text-lg sm:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            FITNESS PRO
          </h1>
          {/* Right Side Icons */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-white text-xl hover:text-red-500 transition flex items-center justify-center"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile Section */}
          <div className="relative">

            <button
              onClick={handleProfileClick}
              className="text-white text-2xl hover:text-red-500 transition flex items-center justify-center"
            >
              <FaUserCircle />
            </button>

            {/* Username (Desktop only) */}
            {user && (
              <span className="hidden sm:inline-block ml-2 text-white text-sm">
                {user.name}
              </span>
            )}

            {/* Dropdown */}
            {user && isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}

          </div>
          </div>

        </div>
      </header>

      {/* Login Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
