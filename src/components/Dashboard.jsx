import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { YOUTUBE_VIDEO_ID } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Dashboard = () => {

  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <h1 className="p-20">{t("greeting", { name: user?.name || "Guest" })}</h1>
      <Footer />
    </>
  );
};

export default Dashboard;
