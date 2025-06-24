import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AutoScrollToTop from "../contexts/AutoScrollToTop";
import { useLanguage } from "../contexts/LanguageContext";
import FloatingLangMenu from "../components/FloatingLangMenu";
import MarqueeBanner from "../components/MarqueeBanner";

const ClientLayout = () => {
  const { lang, setLang } = useLanguage();
  return (
    <>
      <AutoScrollToTop />
      <MarqueeBanner />
      <Header />
      <main>
        <Outlet />
      </main>
      <FloatingLangMenu lang={lang} setLang={setLang} />
      <Footer />
    </>
  );
};

export default ClientLayout;
