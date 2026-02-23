import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white dark:bg-black text-gray-300 pt-16 pb-8 px-6">
      
      <div className="max-w-6xl mx-auto text-center">

        {/* App Name */}
        <h3 className="text-3xl font-bold text-black dark:text-white mb-4">
          {t("appName")}
        </h3>

        {/* Description */}
        <p className="text-black dark:text-gray-400 max-w-2xl mx-auto mb-8 text-sm md:text-base">
         {t("footerText")}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="bg-gray-800 p-3 rounded-full hover:bg-red-500 transition cursor-pointer">
            <FaFacebookF />
          </div>
          <div className="bg-gray-800 p-3 rounded-full hover:bg-red-500 transition cursor-pointer">
            <FaInstagram />
          </div>
          <div className="bg-gray-800 p-3 rounded-full hover:bg-red-500 transition cursor-pointer">
            <FaTwitter />
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {t("copyrightText")}
      </div>

    </footer>
  );
};

export default Footer;
