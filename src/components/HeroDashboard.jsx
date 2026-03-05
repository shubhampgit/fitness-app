import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import MembershipCard from "../components/MembershipCard";
import SubscriptionPlans from "../components/SubscriptionPlans";

const HeroDashboard = () => {
  const { user } = useContext(AuthContext);

  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  const plansRef = useRef(null);

  useEffect(() => {
    const fetchMembership = async () => {
      if (!user) return;

      const q = query(
        collection(db, "user_memberships"),
        where("user_id", "==", user.uid),
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setMembership(snapshot.docs[0].data());
      }

      setLoading(false);
    };

    fetchMembership();
  }, [user]);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-[75vh] bg-black text-white">

  <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">

    {/* LEFT SIDE (TEXT OR MEMBERSHIP CARD) */}

    <div className="flex flex-col justify-center px-16 py-12">

      {!membership ? (

        <>
          <h1 className="text-5xl font-bold mb-6">
            Buy Your <span className="text-green-500">Membership</span>
          </h1>

          <p className="text-gray-400 mb-6 max-w-lg">
            Unlimited access to workouts, sports sessions,
            expert coaching and personalized diet programs.
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Unlimited fitness programs</li>
            <li>✔ Guided expert sessions</li>
            <li>✔ Access to premium sports centers</li>
            <li>✔ Personal training support</li>
          </ul>

          <button
            onClick={scrollToPlans}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold w-fit"
          >
            Buy Now
          </button>
        </>

      ) : (

        <MembershipCard membership={membership} />

      )}

    </div>


    {/* RIGHT SIDE BANNER */}

    <div className="h-[75vh] w-full">

      <img
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
        alt="fitness banner"
        className="w-full h-full object-cover"
      />

    </div>

  </div>

</div>
  );
};

export default HeroDashboard;
