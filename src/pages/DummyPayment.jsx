import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DummyPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state?.plan;

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      newErrors.cardNumber = "Enter valid 16 digit card number";
    }

    if (!formData.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be MM/YY format";
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Enter valid CVV";
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
          expiryDate
        }
      });
    }, 2000);
  };

  if (!plan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
        Invalid Plan Selected
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl w-[420px] shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Secure Payment
        </h2>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
          <p className="text-lg font-semibold">{plan.name}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Amount</p>
          <p className="text-xl font-bold">₹{plan.price}</p>
        </div>

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          maxLength="16"
          className="w-full mb-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mb-3">{errors.cardNumber}</p>
        )}

        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          maxLength="5"
          className="w-full mb-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          value={formData.expiry}
          onChange={handleChange}
        />
        {errors.expiry && (
          <p className="text-red-500 text-sm mb-3">{errors.expiry}</p>
        )}

        <input
          type="password"
          name="cvv"
          placeholder="CVV"
          maxLength="3"
          className="w-full mb-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          value={formData.cvv}
          onChange={handleChange}
        />
        {errors.cvv && (
          <p className="text-red-500 text-sm mb-4">{errors.cvv}</p>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {loading ? "Processing Payment..." : `Pay ₹${plan.price}`}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          This is a demo payment page. No real transaction will occur.
        </p>

      </div>

    </div>
  );
};

export default DummyPayment;