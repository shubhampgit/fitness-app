import React, { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";

const Header = ({ openModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useContext(AuthContext);
  console.log(user);

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
      <header className="fixed top-0 left-0 w-full z-40 bg-black/60 backdrop-blur-md">
        <div className="flex justify-between items-center px-4 py-3">

          <h1
            className="text-white text-lg sm:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            FITNESS PRO
          </h1>

          {/* Profile Icon */}
          <div className="relative">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleProfileClick}
            >
                <FaUserCircle className="text-white text-3xl hover:text-red-500 transition" />

                {user && (
                <span className="text-white text-sm sm:text-base hidden sm:block">
                    {user?.name || "User"}
                </span>
                )}
            </div>

            {/* Dropdown only if logged in */}
            {user && isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
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
