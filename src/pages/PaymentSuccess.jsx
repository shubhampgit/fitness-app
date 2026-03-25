import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../utils/firebase";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("paymentSuccess");

  const plan = state?.plan;
  const lang = i18n.language;

  // ✅ Safe plan name (multi-language)
  const planName =
    typeof plan?.name === "object"
      ? plan.name?.[lang] || plan.name?.en
      : plan?.name;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !plan) {
      setLoading(false);
      return;
    }

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
          expiryDate.setMonth(
            startDate.getMonth() + plan.duration_months
          );

          // ✅ IMPORTANT FIX: store string not object
          await updateDoc(doc(db, "user_memberships", membershipDoc.id), {
            plan_id: plan.id,
            plan_name: plan.name?.[lang] || plan.name?.en,
            price: plan.price,
            expiry_date: expiryDate.toISOString(),
            updated_at: new Date().toISOString(),
          });
        } else {
          startDate = today;

          expiryDate = new Date(startDate);
          expiryDate.setMonth(
            startDate.getMonth() + plan.duration_months
          );

          await addDoc(collection(db, "user_memberships"), {
            user_id: user.uid,
            plan_id: plan.id,
            plan_name: plan.name?.[lang] || plan.name?.en,
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
        setError(t("errorMsg"));
        setLoading(false);
      }
    };

    activateMembership();
  }, [user, plan, lang, t]);

  /**
   * 🔄 Loading State
   */
  if (loading) {
    return (
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white"
      >
        <div className="bg-white dark:bg-gray-900 p-10 rounded-xl text-center shadow-xl">
          <h2 className="text-xl font-semibold mb-2">
            {t("activatingTitle")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("activatingDesc")}
          </p>
        </div>
      </div>
    );
  }

  /**
   * ❌ Error State
   */
  if (error) {
    return (
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white"
      >
        <div className="bg-white dark:bg-gray-900 p-10 rounded-xl text-center shadow-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            {t("errorTitle")}
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            {error}
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg"
          >
            {t("goHome")}
          </button>
        </div>
      </div>
    );
  }

  /**
   * ✅ Success State
   */
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white"
    >
      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl w-[420px] text-center shadow-xl">

        <h1 className="text-3xl font-bold mb-4 text-green-500">
          {t("successTitle")}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {t("successMsg", { plan: planName })}
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t("successSubText")}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold text-white"
        >
          {t("goDashboard")}
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccess;