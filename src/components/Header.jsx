import React, { useState, useContext } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
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
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/60 dark:bg-black/60 backdrop-blur-md">
        <div className="flex justify-between items-center px-12 py-3">
          <h1
            className="text-black dark:text-white text-lg sm:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            {t("appName")}
          </h1>
          {/* Right Side Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <select
              value={i18n.language}
              onChange={(e) => {
                const lang = e.target.value;
                i18n.changeLanguage(lang);
                localStorage.setItem("lang", lang);

                // RTL support
                document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
              }}
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white text-xl hover:text-red-500 transition flex items-center justify-center"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Profile Section */}
            <div className="relative flex items-center gap-3">
              {/* Clickable Wrapper (Name + Icon) */}
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 text-white hover:text-red-500 transition"
              >
                {/* Username (Desktop only) */}
                {user && (
                  <span className="hidden sm:inline-block text-sm">
                    {t("greeting", { name: user.name })}
                  </span>
                )}

                <FaUserCircle className="text-2xl" />
              </button>

              {/* Dropdown */}
              {user && isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {t("signOutButton")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
