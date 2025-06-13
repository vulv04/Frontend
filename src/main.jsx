import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import ThemeProvider from "./contexts/ThemeContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import AutoScrollToTop from "./contexts/AutoScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <LanguageProvider>
        <App />
    </LanguageProvider>
  </ThemeProvider>
);
