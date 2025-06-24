import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n/index.js";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "vi");

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
