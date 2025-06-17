import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../api/authApi";
import { registerSchema } from "../../Validation/authSchema";
import styled from "@emotion/styled";

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
    background-color: rgba(0, 0, 0, 0.6); /* overlay tối */
    z-index: 1;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2; /* nổi lên trên overlay */
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const EyeOpenIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z" />
      <path d="M8 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#000" />
    </svg>
  );

  const EyeClosedIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M13.359 11.238l1.346 1.346a.5.5 0 0 1-.708.708l-1.344-1.344a8.447 8.447 0 0 1-4.653 1.493C3 13.44 0 8 0 8s1.41-2.175 3.252-3.948L1.5 2.448a.5.5 0 1 1 .707-.707l12 12a.5.5 0 0 1-.707.707l-1.141-1.141zM5.354 6.5a2.5 2.5 0 0 0 3.646 3.646l-3.646-3.646z" />
    </svg>
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      const res = await registerApi(data);
      console.log(res);
      reset();
      toast.success("Register successfully!");
      nav("/api/auth/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data.message || "Đăng ký thất bại!");
      reset();
    }
  };

  return (
    <Background>
      <Container>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              {...register("username")}
              style={{ transition: "all 0.3s ease" }}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              style={{ transition: "all 0.3s ease" }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password")}
                style={{ transition: "all 0.3s ease" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <div className="input-group">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                {...register("confirmPassword")}
                style={{ transition: "all 0.3s ease" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3 text-center">
            <span>Already have an account? </span>
            <Link to="/api/auth/login">Login now!</Link>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                transition: "all 0.3s ease-in-out",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </Container>
    </Background>
  );
};

export default RegisterPage;
