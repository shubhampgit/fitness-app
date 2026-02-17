import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Detect login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsModalOpen(true);
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
            <FaUserCircle
              className="text-white text-3xl cursor-pointer hover:text-red-500 transition"
              onClick={handleProfileClick}
            />

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
