import React from "react";
import Header from "./Header";
import BannerSection from "./BannerSection";
import ServicesSection from "./ServicesSection";
import Footer from "./Footer";

const Home = ({ openModal }) => {
  return (
    <>
      <Header openModal={openModal} />
      <BannerSection openModal={openModal} />
      <ServicesSection />
      <Footer />
    </>
  );
};

export default Home;
