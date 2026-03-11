import React from "react";
import BannerSection from "../components/layout/BannerSection";
import ServicesSection from "../components/layout/ServicesSection";

const Home = ({ openModal }) => {
  return (
    <>
      <BannerSection openModal={openModal} />
      <ServicesSection />
    </>
  );
};

export default Home;
