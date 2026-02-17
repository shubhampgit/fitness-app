import React from "react";
import { YOUTUBE_VIDEO_ID } from "../utils/constants";

const BannerSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute inset-0">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1`}
            title="Fitness Background"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Transform Your Body
        </h2>

        <p className="text-sm sm:text-base md:text-xl max-w-xl mb-6 text-gray-200">
          Train harder. Eat smarter. Achieve your fitness goals with expert guidance.
        </p>

        <button className="px-6 py-3 bg-red-500 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-600 transition">
          Start Training
        </button>

      </div>

    </section>
  );
};

export default BannerSection;
