import React from "react";
import { FaDumbbell, FaRunning, FaAppleAlt, FaUserNurse } from "react-icons/fa";

const services = [
  {
    icon: <FaDumbbell className="text-red-500 text-5xl mx-auto mb-6" />,
    title: "Strength Training",
    description:
      "Build muscle mass, improve endurance, and increase overall body strength with structured gym workouts.",
  },
  {
    icon: <FaRunning className="text-blue-500 text-5xl mx-auto mb-6" />,
    title: "Cardio Programs",
    description:
      "Enhance heart health, burn calories, and boost stamina through personalized cardio routines.",
  },
  {
    icon: <FaAppleAlt className="text-green-500 text-5xl mx-auto mb-6" />,
    title: "Diet Planning",
    description:
      "Customized meal plans designed to complement your workouts and maximize performance and recovery.",
  },
  {
    icon: <FaUserNurse className="text-purple-500 text-5xl mx-auto mb-6" />,
    title: "Personal Coaching",
    description:
      "One-on-one expert guidance to ensure proper form, motivation, and consistent progress.",
  },
];

const ServicesSection = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
        >
          {service.icon}
          <h3 className="text-xl font-semibold mb-3 dark:text-white">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;