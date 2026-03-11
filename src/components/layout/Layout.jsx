import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Header />
      <main
        className="flex-grow w-full"
        role="main"
      >
        {children}
      </main>
      <Footer />

    </div>
  );
};

export default Layout;