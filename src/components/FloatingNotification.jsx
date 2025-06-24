import React, { useState } from "react";
import "../assets/css/FloatingNotification.css";
import { FaBell } from "react-icons/fa";

const FloatingNotification = () => {
  const [visible, setVisible] = useState(true); // 👈 Mặc định hiển thị khi vào trang

  return (
    <div className="floating-wrapper">
      {visible && (
        <div className="floating-box">
          <button className="close-btn" onClick={() => setVisible(false)}>
            &times;
          </button>
          <h4>Tích hợp sẵn các ứng dụng</h4>
          <ul>
            <li>➤ Đánh giá sản phẩm</li>
            <li>➤ Mua X tặng Y</li>
            <li>➤ Ứng dụng Affiliate</li>
            <li>➤ Đa ngôn ngữ</li>
            <li>➤ Livechat Facebook</li>
          </ul>
          <p className="note">
            Lưu ý với các ứng dụng trả phí bạn cần cài đặt và mua ứng dụng này
            trên App store Sapo để sử dụng ngay
          </p>
        </div>
      )}

      <div className="bell-icon" onClick={() => setVisible(!visible)}>
        <FaBell />
      </div>
    </div>
  );
};

export default FloatingNotification;
