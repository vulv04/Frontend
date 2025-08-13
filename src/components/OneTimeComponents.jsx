import React, { useEffect, useState } from "react";
import FloatingNotification from "./FloatingNotification";
import PopupAd from "./PopupAd";

const OneTimeComponents = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastShown = localStorage.getItem("popupLastShown");

    if (lastShown !== today) {
      setShow(true);
      localStorage.setItem("popupLastShown", today); // đánh dấu đã hiển thị hôm nay
    }
  }, []);

  if (!show) return null;

  return (
    <>
      <FloatingNotification />
      <PopupAd />
    </>
  );
};

export default OneTimeComponents;
