import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../api/authApi";
import { loginSchema } from "../../Validation/authSchema";
import styled from "@emotion/styled";
import { message } from "antd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SocialLoginButtons from "../../components/SocialLoginButtons";

const Background = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80");
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginApi(data);

      if (response.data.accessToken) {
        const userToStore = {
          _id: response.data.user._id,
          fullname: response.data.user.fullname,
          email: response.data.user.email,
          role: response.data.user.role,
          token: response.data.accessToken,
        };
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(userToStore));

        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error("Không nhận được access token");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng nhập thất bại!");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Background>
        <Container>
          <h2 className="text-center mb-4">Đăng nhập</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Nhập email của bạn"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu:
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập mật khẩu"
                  {...register("password")}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? "👁" : "🙈"}
                </span>
              </div>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="mb-3 text-center">
              <span>Bạn chưa có tài khoản? </span>
              <Link to="/api/auth/register">Đăng ký ngay!</Link>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <SocialLoginButtons />
            </div>
          </form>
        </Container>
      </Background>
      <Footer />
    </div>
  );
};

export default LoginPage;
