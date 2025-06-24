import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollToTop = () => {
  const path = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[path])
  return null
};

export default AutoScrollToTop;
