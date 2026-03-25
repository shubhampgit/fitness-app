import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import PlanCardSkeleton from "../../skeletons/PlanCardSkeleton";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const SubscriptionPlans = () => {
  const { t } = useTranslation("dashboard");
  const lang = i18n.language;

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchPlans = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "subscription_plans")
        );

        const plansData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedPlans = [...plansData].sort(
          (a, b) => a.duration_months - b.duration_months
        );

        if (isMounted) {
          setPlans(sortedPlans);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        if (isMounted) {
          setError("Failed to load subscription plans.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ---------- Loading ---------- */

  if (loading) {
    return (
      <section className="w-full py-24 bg-gray-100 dark:bg-black">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <PlanCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  /* ---------- Error ---------- */

  if (error) {
    return (
      <div className="text-center py-24 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section
      id="plans-section"
      className="w-full py-24 bg-gray-100 text-black dark:bg-black dark:text-white transition-colors duration-300"
    >
      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          {t("planHeading")}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
          {t("planText")}
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
        {plans.map((plan) => {
          const name =
            plan.name?.[lang] || plan.name?.en || "Plan";

          const features =
            plan.features?.[lang] || plan.features?.en || [];

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
              ${
                plan.is_popular
                  ? "border-green-500 bg-white dark:bg-gray-900 shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              }`}
            >
              {/* Popular Badge */}
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs px-4 py-1 rounded-full font-semibold shadow-md">
                  {t("mostPopular")}
                </div>
              )}

              <div>
                {/* Plan Name */}
                <h3 className="text-2xl font-semibold mb-2">
                  {name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ₹{plan.price}
                  </span>

                  <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">
                    {t("perMonth", {
                      count: plan.duration_months,
                    })}
                  </span>
                </div>

                {/* Features (Multi-language) */}
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm mb-8">
                  {features.map((feature, i) => (
                    <li key={i}>
                      <span className="text-green-500">✔</span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate(`/plan/${plan.id}`)}
                className={`w-full py-3 rounded-xl font-semibold transition
                  ${
                    plan.is_popular
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
              >
                {t("selectPlan")}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubscriptionPlans;