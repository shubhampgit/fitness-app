import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { YOUTUBE_VIDEO_ID } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />

      <section className="relative w-full h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">

        {/* Background Video */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1`}
            title="Fitness Background"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black/70 dark:bg-black/80"></div>
        </div>

        {/* Dashboard Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">

          <h2 className="text-3xl sm:text-4xl md:text-6xl max-w-xl font-extrabold mb-6">
            Hi, {user?.name || "User"} Welcome to Fitness Pro 💪
          </h2>

          <p className="text-sm sm:text-base md:text-xl max-w-xl mb-8 text-gray-200">
            Your fitness journey starts here. Book your membership and unlock premium training programs.
          </p>

          <button className="px-6 py-3 bg-red-500 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-600 transition">
            Book Membership
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
