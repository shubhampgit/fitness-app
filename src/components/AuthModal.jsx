import React from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      onClose();
      navigate("/dashboard");   // ✅ redirect after login

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-8 w-[90%] max-w-md relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to Fitness Pro
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>

      </div>
    </div>
  );
};

export default AuthModal;
