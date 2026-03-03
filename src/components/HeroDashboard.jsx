import React from "react";

const HeroDashboard = () => {
  return (
    <section className="w-full min-h-[80vh] bg-linear-to-r from-black via-gray-900 to-black text-white flex items-center">
      <div className="w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div className="w-full md:w-[80%] flex items-center px-40">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Buy Your <span className="text-green-400">Membership</span>
            </h1>

            <p className="text-gray-400 text-lg">
              Unlimited access to workouts, sports sessions, expert coaching and
              personalized diet programs.
            </p>

            <ul className="space-y-2 text-gray-400">
              <li>✔ Unlimited fitness programs</li>
              <li>✔ Guided expert sessions</li>
              <li>✔ Access to premium sports centers</li>
              <li>✔ Personal training support</li>
            </ul>

            <button
              onClick={() =>
                document
                  .getElementById("plans-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 transition rounded-lg font-semibold text-black"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE WITH OVERLAY */}
        <div className="relative h-125 w-full rounded-2xl overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
            alt="Fitness"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Optional Text Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl font-bold">Premium Fitness Experience</h2>
            <p className="text-sm text-gray-300">
              Transform your body. Transform your life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDashboard;
