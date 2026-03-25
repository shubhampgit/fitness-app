import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const MembershipCard = ({ membership, scrollToPlans }) => {
  const { t } = useTranslation("membership");

  if (!membership) return null;

  const {
    start_date,
    expiry_date,
    plan_name,
    price,
    currency = "INR",
  } = membership;

  const lang = i18n.language;

  /**
   * Multi-language plan name
   */
  const planName =
    typeof plan_name === "object"
      ? plan_name?.[lang] || plan_name?.en
      : plan_name;

  /**
   * Calculate dates, status, days left
   */
  const { startDate, expiryDate, daysLeft, status } = useMemo(() => {
    const start = new Date(start_date);
    const expiry = new Date(expiry_date);
    const today = new Date();

    const remainingDays = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return {
      startDate: start,
      expiryDate: expiry,
      daysLeft: remainingDays,
      status: remainingDays > 0 ? "active" : "expired",
    };
  }, [start_date, expiry_date]);

  /**
   * Avoid negative days
   */
  const safeDaysLeft = Math.max(0, daysLeft);

  /**
   * Format date
   */
  const formatDate = (date) =>
    new Intl.DateTimeFormat(lang, {
      dateStyle: "medium",
    }).format(date);

  /**
   * Format currency
   */
  const formatCurrency = (value) =>
    new Intl.NumberFormat(lang, {
      style: "currency",
      currency,
    }).format(value);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-md md:max-w-lg lg:max-w-xl transition-colors duration-300"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">
        {t("title")}
      </h2>

      {/* Plan */}
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {t("plan")}
      </p>
      <p className="text-lg font-bold mb-4">
        {planName}
      </p>

      {/* Price */}
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {t("price")}
      </p>
      <p className="mb-4">
        {formatCurrency(price)}
      </p>

      {/* Dates */}
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("startDate")}
          </p>
          <p>{formatDate(startDate)}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("expiryDate")}
          </p>
          <p>{formatDate(expiryDate)}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "active"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {t(status)}
        </span>

        <span className="text-gray-500 dark:text-gray-400">
          {safeDaysLeft > 0
            ? t("daysLeft", { count: safeDaysLeft })
            : t("expired")}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={scrollToPlans}
        className="mt-5 w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold text-white transition"
      >
        {t("renew")}
      </button>
    </div>
  );
};

export default MembershipCard;