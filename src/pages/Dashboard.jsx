import React from "react";
import HeroDashboard from "../components/features/dashboard/HeroDashboard";
import SubscriptionPlans from "../components/features/plans/SubscriptionPlans";
import { useRef } from "react";

const Dashboard = () => {

  const plansRef = useRef(null);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroDashboard scrollToPlans={scrollToPlans} />
      <div ref={plansRef}>
        <SubscriptionPlans />
      </div>
    </>
  );
};

export default Dashboard;
