import React from "react";
import { FaDumbbell, FaRunning, FaAppleAlt, FaUserNurse } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const services = [
  {
    icon: FaDumbbell,
    color: "text-red-500",
    titleKey: "strengthTraining",
    descKey: "strengthTrainingDesc",
  },
  {
    icon: FaRunning,
    color: "text-blue-500",
    titleKey: "cardioPrograms",
    descKey: "cardioProgramsDesc",
  },
  {
    icon: FaAppleAlt,
    color: "text-green-500",
    titleKey: "dietPlanning",
    descKey: "dietPlanningDesc",
  },
  {
    icon: FaUserNurse,
    color: "text-purple-500",
    titleKey: "personalCoaching",
    descKey: "personalCoachingDesc",
  },
];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-black transition-colors duration-300">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {services.map(({ icon: Icon, color, titleKey, descKey }, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-800"
          >
            {/* Icon */}

            <Icon
              className={`${color} text-5xl mx-auto mb-6`}
              aria-hidden="true"
            />

            {/* Title */}

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {t(titleKey)}
            </h3>

            {/* Description */}

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t(descKey)}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default ServicesSection;