import React from "react";
import { FaDumbbell, FaRunning, FaAppleAlt, FaUserNurse } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const services = [
  {
    icon: <FaDumbbell className="text-red-500 text-5xl mx-auto mb-6" />,
    titleKey: "strengthTraining",
    descKey:
      "strengthTrainingDesc",
  },
  {
    icon: <FaRunning className="text-blue-500 text-5xl mx-auto mb-6" />,
    titleKey: "cardioPrograms",
    descKey:
      "cardioProgramsDesc",
  },
  {
    icon: <FaAppleAlt className="text-green-500 text-5xl mx-auto mb-6" />,
    titleKey: "dietPlanning",
    descKey:
      "dietPlanningDesc",
  },
  {
    icon: <FaUserNurse className="text-purple-500 text-5xl mx-auto mb-6" />,
    titleKey: "personalCoaching",
    descKey:
      "personalCoachingDesc",
  },
];

const ServicesSection = () => {
  const { t } = useTranslation();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
        >
          {service.icon}
          <h3 className="text-xl font-semibold mb-3 dark:text-white">
            {t(service.titleKey)}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {t(service.descKey)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;