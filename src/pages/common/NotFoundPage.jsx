import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "bold",
          margin: 0,
          color: "#1677ff",
          lineHeight: "1",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "28px",
          marginTop: "10px",
          color: "#333",
          fontWeight: "600",
        }}
      >
        Trang bạn tìm không tồn tại.
      </h2>
      <p style={{ fontSize: "16px", color: "#555", maxWidth: "500px" }}>
        Có thể trang đã bị xóa, di chuyển hoặc bạn nhập sai địa chỉ.
      </p>
      <Link to="/">
        <Button
          type="primary"
          size="large"
          style={{
            marginTop: "20px",
            borderRadius: "8px",
            padding: "0 32px",
            height: "44px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(22, 119, 255, 0.3)",
          }}
        >
          Về Trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
