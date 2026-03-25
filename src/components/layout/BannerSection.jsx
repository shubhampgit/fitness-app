import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useTranslation } from "react-i18next";
import { YOUTUBE_VIDEO_ID } from "../../utils/constants";

const BannerSection = ({ openModal }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  const handleStartTraining = useCallback(() => {
    if (auth?.currentUser) {
      navigate("/dashboard");
    } else {
      openModal?.();
    }
  }, [navigate, openModal]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-gray-100 dark:bg-black transition-colors duration-300"
      aria-label="Fitness banner"
    >

      <div className="absolute inset-0">
        <img
          src="/fitness-fallback.jpg"
          alt="Fitness training background"
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&playsinline=1`}
          title="Fitness background video"
          allow="autoplay; fullscreen"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-brightness-75"></div>

      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-2xl">

          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t("bannerHeading")}
          </h1>

          <button
            onClick={handleStartTraining}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t("bannerBtnText")}
          </button>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;