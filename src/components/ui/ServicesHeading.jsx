import React from "react";
import { useTranslation } from "react-i18next";

const ServicesHeading = () => {
  const { t } = useTranslation("home");
    return (
        <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t("serviceHeading")}
        </h2>
        <p className="text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
          {t("serviceText")}
        </p>
      </div>
    );
};

export default ServicesHeading;