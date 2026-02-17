import React from "react";
import { FaDumbbell, FaRunning, FaAppleAlt, FaUserNurse } from "react-icons/fa";

const ServiceCard = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
          <FaDumbbell className="text-red-500 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-3">Strength Training</h3>
          <p className="text-gray-600 text-sm">
            Build muscle mass, improve endurance, and increase overall body strength 
            with structured gym workouts.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
          <FaRunning className="text-blue-500 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-3">Cardio Programs</h3>
          <p className="text-gray-600 text-sm">
            Enhance heart health, burn calories, and boost stamina through 
            personalized cardio routines.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
          <FaAppleAlt className="text-green-500 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-3">Diet Planning</h3>
          <p className="text-gray-600 text-sm">
            Customized meal plans designed to complement your workouts and 
            maximize performance and recovery.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300">
          <FaUserNurse className="text-purple-500 text-5xl mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-3">Personal Coaching</h3>
          <p className="text-gray-600 text-sm">
            One-on-one expert guidance to ensure proper form, motivation, 
            and consistent progress.
          </p>
        </div>

      </div>
  );
};

export default ServiceCard;