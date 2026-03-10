import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const plan = state?.plan;
  const startDate = new Date(state?.startDate);
  const expiryDate = new Date(state?.expiryDate);

  const handleMembershipPurchase = async (plan, user) => {
    try {
      const today = new Date();

      // Query existing membership
      const membershipQuery = query(
        collection(db, "user_memberships"),
        where("user_id", "==", user.uid),
      );

      const snapshot = await getDocs(membershipQuery);

      let startDate;
      let expiryDate;

      // If membership already exists
      if (!snapshot.empty) {
        const membershipDoc = snapshot.docs[0];
        const membershipData = membershipDoc.data();

        const existingExpiry = new Date(membershipData.expiry_date);

        // If membership still active
        if (existingExpiry > today) {
          startDate = existingExpiry;
        } else {
          startDate = today;
        }

        // Calculate new expiry
        expiryDate = new Date(startDate);
        expiryDate.setMonth(expiryDate.getMonth() + plan.duration_months);

        // Update membership
        await updateDoc(doc(db, "user_memberships", membershipDoc.id), {
          plan_id: plan.id,
          plan_name: plan.name,
          price: plan.price,
          expiry_date: expiryDate.toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      // If membership does NOT exist
      else {
        startDate = today;

        expiryDate = new Date(startDate);
        expiryDate.setMonth(expiryDate.getMonth() + plan.duration_months);

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

      console.log("Membership updated successfully");
    } catch (error) {
      console.error("Membership update error:", error);
    }
  };

  useEffect(() => {
    if (user && plan) {
      handleMembershipPurchase(plan, user);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-xl w-[420px] text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>

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
