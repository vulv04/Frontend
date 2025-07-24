import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, Result, Button } from "antd";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null); // "success", "already", "error"

  useEffect(() => {
    const statusParam = new URLSearchParams(location.search).get("status");
console.log(statusParam);
    if (!statusParam) {
      setStatus("error");
    } else {
      setStatus(statusParam);
    }
  }, [location]);

  const renderResult = () => {
    switch (status) {
      case "success":
        return (
          <Result
            status="success"
            title="🎉 Xác minh email thành công!"
            subTitle="Bạn có thể đăng nhập vào hệ thống."
            extra={[
              <Button
                type="primary"
                key="login"
                onClick={() => navigate("/api/auth/login")}
              >
                Đăng nhập ngay
              </Button>,
            ]}
          />
        );
      case "already":
        return (
          <Result
            status="info"
            title="Email đã được xác minh trước đó"
            extra={[
              <Button
                type="primary"
                key="login"
                onClick={() => navigate("/api/auth/login")}
              >
                Đăng nhập
              </Button>,
            ]}
          />
        );
      case "error":
      default:
        return (
          <Result
            status="error"
            title="Xác minh thất bại"
            subTitle="Token không hợp lệ hoặc đã hết hạn."
            extra={[
              <Button type="default" key="home" onClick={() => navigate("/")}>
                Về trang chủ
              </Button>,
            ]}
          />
        );
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {status === null ? (
        <Spin size="large" tip="Đang xác minh email..." />
      ) : (
        renderResult()
      )}
    </div>
  );
};

export default VerifyEmail;
