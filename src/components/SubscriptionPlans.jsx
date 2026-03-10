import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import PlanCardSkeleton from "./ui/PlanCardSkeleton";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      const querySnapshot = await getDocs(collection(db, "subscription_plans"));

      const plansData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // SORT BY duration_months ASCENDING
      const sortedPlans = plansData.sort(
        (a, b) => a.duration_months - b.duration_months,
      );

      setPlans(sortedPlans);
      setLoading(false);
    };

    fetchPlans();
  }, []);

  return (
    <section
      id="plans-section"
      className="w-full py-24 bg-gradient-to-b from-black via-gray-950 to-black text-white"
    >
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-400 mt-4 text-lg">
          Flexible memberships built for your fitness journey.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <PlanCardSkeleton key={i} />
            ))
          : plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.is_popular
                    ? "border-green-500 bg-gray-900 shadow-lg scale-105"
                    : "border-gray-800 bg-gray-900/70"
                }`}
              >
                {/* Popular Badge */}
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs px-4 py-1 rounded-full font-semibold shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-400 ml-2 text-sm">
                      / {plan.duration_months} month
                      {plan.duration_months > 1 && "s"}
                    </span>
                  </div>

                  <ul className="space-y-3 text-gray-400 text-sm mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i}>
                        <span className="text-green-400">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate(`/plan/${plan.id}`)}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.is_popular
                      ? "bg-green-500 hover:bg-green-600 text-black"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
