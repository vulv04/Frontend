import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AutoScrollToTop from "../contexts/AutoScrollToTop";

const ClientLayout = () => {
  return (
    <>
      <AutoScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
