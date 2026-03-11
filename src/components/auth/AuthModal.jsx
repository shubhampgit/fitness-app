import React from "react";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-black text-white w-[90%] max-w-md rounded-2xl p-8 shadow-2xl animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Fitness Pro</h2>
          <p className="text-gray-400 text-sm mt-2">
            {t("signInText")}
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          {t("signInGoogle")}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          {t("termsText")}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
