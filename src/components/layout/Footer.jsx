import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const socialLinks = [
  {
    icon: FaFacebookF,
    url: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    url: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com",
    label: "Twitter",
  },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-300 pt-16 pb-8 px-6 transition-colors duration-300">

      <div className="max-w-6xl mx-auto text-center">

        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("appName")}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 text-sm md:text-base">
          {t("footerText")}
        </p>

        <nav aria-label="Social media links">
          <div className="flex justify-center gap-6 mb-10">

            {socialLinks.map(({ icon: Icon, url, label }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Icon />
              </a>
            ))}

          </div>
        </nav>

      </div>

      <div className="border-t border-gray-300 dark:border-gray-800 pt-6 text-center text-sm text-gray-600 dark:text-gray-500">
        © {new Date().getFullYear()} {t("copyrightText")}
      </div>

    </footer>
  );
};

export default Footer;