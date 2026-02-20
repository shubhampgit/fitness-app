import React from "react";
import { YOUTUBE_VIDEO_ID } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const BannerSection = ( { openModal }) => {

  const navigate = useNavigate();

  const handleStartTraining = () => {
    if (auth.currentUser) {
      navigate("/dashboard");
    } else {
      openModal();   // 🔥 Open same modal
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Fallback Background */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900">
        <img
          src="/fitness-fallback.jpg"
          alt="Fitness Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* YouTube Video */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&playsinline=1`}
          title="Fitness Background"
          allow="autoplay; fullscreen"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Train Hard. Eat Clean. Live Strong.
          </h1>
          <button onClick={handleStartTraining} className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition">
            Start Training
          </button>
        </div>
      </div>

    </section>
  );
};

export default BannerSection;
