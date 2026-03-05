import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

const DummyPayment = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state?.plan;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {

    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill payment details");
      return;
    }

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">

      <div className="bg-gray-900 p-10 rounded-xl w-[420px] shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Secure Payment
        </h2>

        {/* Plan Details */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-400">Plan</p>
          <p className="text-lg font-semibold">{plan.name}</p>

          <p className="text-sm text-gray-400 mt-2">Amount</p>
          <p className="text-xl font-bold">₹{plan.price}</p>
        </div>

        {/* Card Number */}
        <input
          type="text"
          placeholder="Card Number"
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-700"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        {/* Expiry */}
        <input
          type="text"
          placeholder="MM/YY"
          className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-700"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        {/* CVV */}
        <input
          type="password"
          placeholder="CVV"
          className="w-full mb-6 px-3 py-2 rounded bg-gray-800 border border-gray-700"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold"
        >
          {loading ? "Processing Payment..." : `Pay ₹${plan.price}`}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          This is a demo payment page
        </p>

      </div>

    </div>
  );
};

export default DummyPayment;