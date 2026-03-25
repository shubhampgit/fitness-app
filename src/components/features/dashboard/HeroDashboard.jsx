import React, { useState, useEffect, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { AuthContext } from "../../../context/AuthContext";
import MembershipCard from "../../ui/MembershipCard";
import HeroDashboardSkeleton from "../../skeletons/HeroDashboardSkeleton";
import { useTranslation } from "react-i18next";

const HeroDashboard = ({ scrollToPlans }) => {
  const { t } = useTranslation("dashboard");
  const benefits = t("benefits", { returnObjects: true });

  const { user } = useContext(AuthContext);

  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMembership = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const membershipQuery = query(
          collection(db, "user_memberships"),
          where("user_id", "==", user.uid),
        );

        const snapshot = await getDocs(membershipQuery);

        if (!snapshot.empty && isMounted) {
          setMembership(snapshot.docs[0].data());
        }
      } catch (err) {
        console.error("Error fetching membership:", err);
        if (isMounted) {
          setError("Unable to load membership details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMembership();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) {
    return <HeroDashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full min-h-[75vh] bg-gray-100 text-black dark:bg-black dark:text-white transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-col justify-center px-6 md:px-16 py-12">
          {!membership ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("dashboardHeading")}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
                {t("dashboardText")}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                {benefits.map((item, index) => (
                  <li key={index}>✔ {item}</li>
                ))}
              </ul>

              <button
                onClick={scrollToPlans}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold w-fit transition"
              >
                {t("buyNowBtn")}
              </button>
            </>
          ) : (
            <MembershipCard
              membership={membership}
              scrollToPlans={scrollToPlans}
            />
          )}
        </div>

        <div className="h-[300px] md:h-[75vh] w-full">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
            alt="Fitness training banner"
            className="w-full h-full object-cove rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroDashboard;
