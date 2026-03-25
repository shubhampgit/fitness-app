import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const DummyPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("payment");

  const plan = state?.plan;

  const lang = i18n.language;

  const planName =
    typeof plan?.name === "object"
      ? plan.name?.[lang] || plan.name?.en
      : plan?.name;

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = t("errors.card");
    }

    if (!formData.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = t("errors.expiry");
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = t("errors.cvv");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const startDate = new Date();
      const expiryDate = new Date();

      expiryDate.setMonth(startDate.getMonth() + plan.duration_months);

      navigate("/payment-success", {
        state: {
          plan,
          startDate,
          expiryDate,
        },
      });
    }, 2000);
  };

  if (!plan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
        {t("invalidPlan")}
      </div>
    );
  }

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white"
    >
      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl w-[420px] shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("title")}
        </h2>

        {/* Plan Info */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("plan")}
          </p>
          <p className="text-lg font-semibold">{planName}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t("amount")}
          </p>
          <p className="text-xl font-bold">₹{plan.price}</p>
        </div>

        {/* Card */}
        <input
          type="text"
          name="cardNumber"
          placeholder={t("cardPlaceholder")}
          maxLength="16"
          className="w-full mb-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mb-3">{errors.cardNumber}</p>
        )}

        {/* Expiry */}
        <input
          type="text"
          name="expiry"
          placeholder={t("expiryPlaceholder")}
          maxLength="5"
          className="w-full mb-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          value={formData.expiry}
          onChange={handleChange}
        />
        {errors.expiry && (
          <p className="text-red-500 text-sm mb-3">{errors.expiry}</p>
        )}

        {/* CVV */}
        <input
          type="password"
          name="cvv"
          placeholder={t("cvvPlaceholder")}
          maxLength="3"
          className="w-full mb-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          value={formData.cvv}
          onChange={handleChange}
        />
        {errors.cvv && (
          <p className="text-red-500 text-sm mb-4">{errors.cvv}</p>
        )}

        {/* Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {loading
            ? t("processing")
            : t("payBtn", { amount: `₹${plan.price}` })}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          {t("demoText")}
        </p>

      </div>
    </div>
  );
};

export default DummyPayment;