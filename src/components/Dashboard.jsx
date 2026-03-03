import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeroDashboard from "./HeroDashboard";
import SubscriptionPlans from "./SubscriptionPlans";

const Dashboard = () => {
  return (
    <>
      <Header />
      <HeroDashboard />
      <SubscriptionPlans />
      <Footer />
    </>
  );
};

export default Dashboard;
