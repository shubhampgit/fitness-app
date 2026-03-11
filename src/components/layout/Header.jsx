import React, { useState, useContext, useRef, useEffect } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;

    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800 transition-colors">

        <div className="flex justify-between items-center px-6 md:px-12 py-3">

          <h1
            className="text-lg sm:text-xl font-bold cursor-pointer text-gray-900 dark:text-white"
            onClick={() => navigate("/")}
          >
            {t("appName")}
          </h1>

          <div className="flex items-center gap-4 sm:gap-6">

            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded px-2 py-1 text-sm border border-gray-300 dark:border-gray-700"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-gray-700 dark:text-white text-xl hover:text-red-500 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <div
              ref={dropdownRef}
              className="relative flex items-center gap-2"
            >
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-red-500 transition"
                aria-label="User menu"
              >
                {user && (
                  <span className="hidden sm:inline text-sm">
                    {t("greeting", { name: user.name })}
                  </span>
                )}

                <FaUserCircle className="text-2xl" />
              </button>

              {user && isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {t("signOutButton")}
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;