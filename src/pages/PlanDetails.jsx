import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import React from "react";
import { useNavigate } from "react-router-dom";

const PlanDetails = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      const docRef = doc(db, "subscription_plans", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlan({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchPlan();
  }, [id]);

  const handleBuyMembership = () => {
    navigate("/payment", { state: { plan } });
  };

  if (!plan) return <p className="text-white p-10">Loading...</p>;

  return (
    <section className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* LEFT IMAGE */}
      <div className="md:w-1/2">
        <img
          src={plan.banner_image}
          alt={plan.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT DETAILS */}
      <div className="md:w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">{plan.name} Membership</h1>

        <p className="text-gray-400 mb-6">{plan.description}</p>

        <p className="text-3xl font-bold mb-6">₹{plan.price}</p>

        <h3 className="text-xl font-semibold mb-3">What's Included</h3>

        <ul className="space-y-2 text-gray-400 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index}>✔ {feature}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-3">Benefits</h3>

        <ul className="space-y-2 text-gray-400 mb-8">
          {plan.benefits.map((benefit, index) => (
            <li key={index}>⭐ {benefit}</li>
          ))}
        </ul>

        <button
          onClick={handleBuyMembership}
          className="bg-green-500 hover:bg-green-600 py-3 px-8 rounded-xl font-semibold text-black"
        >
          Buy Membership
        </button>
      </div>
    </section>
  );
};

export default PlanDetails;
