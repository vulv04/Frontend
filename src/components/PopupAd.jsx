// src/components/PopupAd.jsx
import React, { useEffect, useState } from "react";
import "../assets/css/PopupAd.css";
import Popup from "../assets/imgs/popup.png";

const PopupAd = () => {
  const [visible, setVisible] = useState(true);

  // Ẩn sau 10 giây (tùy chọn)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={() => setVisible(false)}>
          &times;
        </button>
        <img
          src={Popup} // thay bằng ảnh banner của bạn
          alt="Super Sale"
          className="popup-img"
        />
      </div>
    </div>
  );
};

export default PopupAd;
