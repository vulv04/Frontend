import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      axios
        .get(`http://localhost:3000/api/auth/verify-email?token=${token}`)
        .then((res) => {
          message.success(res.data.message || "Xác thực thành công");
          navigate("auth/login");
        })
        .catch((err) => {
          message.error(
            err.response?.data?.message ||
              "Xác thực thất bại hoặc token không hợp lệ"
          );
        });
    }
  }, [location, navigate]);

  return <div>Đang xác minh email...</div>;
};

export default VerifyEmail;
