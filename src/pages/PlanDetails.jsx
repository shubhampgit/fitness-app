import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import PlanDetailsSkeleton from "../components/skeletons/PlanDetailsSkeleton";

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
          setError("Unable to load plan details.");
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
  }, [id]);

  const handleBuyMembership = () => {
    if (!plan) return;
    navigate("/payment", { state: { plan } });
  };

  if (loading) {
    return <PlanDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-gray-100 text-black dark:bg-black dark:text-white">

      <div className="md:w-1/2 h-[350px] md:h-auto">
        <img
          src={plan.banner_image}
          alt={plan.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center">

        <h1 className="text-4xl font-bold mb-4">
          {plan.name} Membership
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {plan.description}
        </p>

        <p className="text-3xl font-bold mb-6">
          ₹{plan.price}
        </p>

        {Array.isArray(plan.features) && plan.features.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-3">
              What's Included
            </h3>

            <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index}>✔ {feature}</li>
              ))}
            </ul>
          </>
        )}

        {Array.isArray(plan.benefits) && plan.benefits.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-3">
              Benefits
            </h3>

            <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-8">
              {plan.benefits.map((benefit, index) => (
                <li key={index}>⭐ {benefit}</li>
              ))}
            </ul>
          </>
        )}

        <button
          onClick={handleBuyMembership}
          className="bg-green-500 hover:bg-green-600 py-3 px-8 rounded-xl font-semibold text-white transition"
        >
          Buy Membership
        </button>

      </div>

    </section>
  );
};

export default PlanDetails;