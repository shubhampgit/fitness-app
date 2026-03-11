import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../utils/firebase";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const plan = state?.plan;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!user || !plan) return;

    const activateMembership = async () => {
      try {
        const today = new Date();

        const membershipQuery = query(
          collection(db, "user_memberships"),
          where("user_id", "==", user.uid)
        );

        const snapshot = await getDocs(membershipQuery);

        let startDate;
        let expiryDate;

        if (!snapshot.empty) {
          const membershipDoc = snapshot.docs[0];
          const membershipData = membershipDoc.data();

          const existingExpiry = new Date(membershipData.expiry_date);

          startDate = existingExpiry > today ? existingExpiry : today;

          expiryDate = new Date(startDate);
          expiryDate.setMonth(startDate.getMonth() + plan.duration_months);

          await updateDoc(doc(db, "user_memberships", membershipDoc.id), {
            plan_id: plan.id,
            plan_name: plan.name,
            price: plan.price,
            expiry_date: expiryDate.toISOString(),
            updated_at: new Date().toISOString(),
          });
        } else {
          startDate = today;

          expiryDate = new Date(startDate);
          expiryDate.setMonth(startDate.getMonth() + plan.duration_months);

          await addDoc(collection(db, "user_memberships"), {
            user_id: user.uid,
            plan_id: plan.id,
            plan_name: plan.name,
            price: plan.price,
            start_date: startDate.toISOString(),
            expiry_date: expiryDate.toISOString(),
            status: "active",
            created_at: new Date().toISOString(),
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("Membership update error:", err);
        setError("Something went wrong while activating membership.");
        setLoading(false);
      }
    };

    activateMembership();
  }, [user, plan]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-xl text-center shadow-xl">
          <h2 className="text-xl font-semibold mb-2">
            Activating your membership...
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please wait while we confirm your subscription.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-xl text-center shadow-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            Payment Error
          </h2>

          <p className="text-gray-500 dark:text-gray-400">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl w-[420px] text-center shadow-xl">

        <h1 className="text-3xl font-bold mb-4 text-green-500">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Your <span className="font-semibold">{plan.name}</span> membership
          has been activated.
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Enjoy unlimited workouts and fitness sessions.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold text-white"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccess;