// src/components/FloatingButtons.jsx
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaCommentDots, FaPhone } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import "../assets/css/FloatingButtons.css";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-buttons">
      {showScrollTop && (
        <button
          className="circle-btn"
          onClick={scrollToTop}
          title="Lên đầu trang"
        >
          <FaChevronUp />
        </button>
      )}

      <div className="phone-wrapper" title="Liên hệ">
        <span className="ripple"></span>
        <span className="ripple ripple-delay"></span>
        <button className="phone-shake-btn circle-btn">
          <FaPhone />
        </button>
      </div>

      <a
        href="https://m.me/yourpage"
        className="circle-btn"
        title="Messenger"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsMessenger />
      </a>
    </div>
  );
};

export default FloatingButtons;
