import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import PlanDetailsSkeleton from "../components/skeletons/PlanDetailsSkeleton";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation("planDetails");
  const lang = i18n.language;

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlan = async () => {
      try {
        const docRef = doc(db, "subscription_plans", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Plan not found");
        }

        if (isMounted) {
          setPlan({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        if (isMounted) {
          setError(t("error"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlan();

    return () => {
      isMounted = false;
    };
  }, [id, t]);

  const handleBuyMembership = () => {
    if (!plan) return;
    navigate("/payment", {
      state: {
        plan: {
          ...plan,
          plan_name: plan.name?.[lang] || plan.name?.en,
        },
      },
    });
  };

  const name = plan?.name?.[lang] || plan?.name?.en;
  const description = plan?.description?.[lang] || plan?.description;
  const features = plan?.features?.[lang] || plan?.features?.en || [];
  const benefits = plan?.benefits?.[lang] || plan?.benefits?.en || [];

  const formatCurrency = (value) =>
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: plan?.currency || "INR",
    }).format(value);

  if (loading) return <PlanDetailsSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("errorTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white"
          >
            {t("goHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-20 md:pt-24 w-full flex flex-col md:flex-row bg-gray-100 text-black dark:bg-black dark:text-white">
      {/* LEFT IMAGE */}
      <div className="md:w-1/2 w-full h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={plan.banner_image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="md:w-1/2 px-6 md:px-10 py-8 md:py-10 flex flex-col justify-start">
        {/* Plan Name */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {name} {t("membershipLabel")}
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>

        {/* Price */}
        <p className="text-3xl font-bold mb-6">{formatCurrency(plan.price)}</p>

        {/* Features */}
        {features.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-3">{t("includedText")}</h3>

            <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              {features.map((feature, index) => (
                <li key={index}>✔ {feature}</li>
              ))}
            </ul>
          </>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-3">{t("benefitsLabel")}</h3>

            <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index}>⭐ {benefit}</li>
              ))}
            </ul>
          </>
        )}

        {/* CTA */}
        <button
          onClick={handleBuyMembership}
          className="bg-green-500 hover:bg-green-600 py-3 px-8 rounded-xl font-semibold text-white transition w-fit"
        >
          {t("buyBtn")}
        </button>
      </div>
    </section>
  );
};

export default PlanDetails;
