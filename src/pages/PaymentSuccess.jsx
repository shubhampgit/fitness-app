import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const PaymentSuccess = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const plan = state?.plan;
  const startDate = new Date(state?.startDate);
  const expiryDate = new Date(state?.expiryDate);

  useEffect(() => {

    const saveMembership = async () => {

      if (!user) return;

      const paymentId =
        "PAY_" + Math.random().toString(36).substr(2, 9);

      await addDoc(collection(db, "user_memberships"), {

        user_id: user.uid,
        plan_id: plan.id,
        plan_name: plan.name,
        price: plan.price,

        start_date: startDate.toISOString(),
        expiry_date: expiryDate.toISOString(),

        payment_id: paymentId,
        status: "active",

        created_at: new Date().toISOString()

      });

    };

    saveMembership();

  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">

      <div className="bg-gray-900 p-10 rounded-xl w-[420px] text-center">

        <h1 className="text-3xl font-bold mb-4">
          Payment Successful 🎉
        </h1>

        <p>Your membership has been activated.</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-500 py-3 rounded-lg"
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
};

export default PaymentSuccess;