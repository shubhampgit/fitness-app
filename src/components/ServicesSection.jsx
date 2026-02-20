import React from "react";
import ServiceCard from "./ServiceCard";
import ServicesHeading from "./ServicesHeading";

const ServicesSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-black py-24 px-6">
      <ServicesHeading />
      <ServiceCard />
    </section>
  );
};

export default ServicesSection;
