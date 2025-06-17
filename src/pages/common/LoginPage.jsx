import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../api/authApi";
import { loginSchema } from "../../Validation/authSchema";
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
    background-color: rgba(0, 0, 0, 0.6); /* Overlay đen mờ */
    z-index: 1;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2; /* Để form nằm trên overlay */
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log("Login data sent:", data);
      const response = await loginApi(data);
      console.log("Login response:", response.data);

      reset();

      if (response.data.accessToken) {
        console.log("✅ Access token exists. Navigating...");

        // Gộp user + token để component khác dùng
        if (response.data.accessToken) {
          const userToStore = {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            role: response.data.user.role,
            token: response.data.accessToken,
          };
          console.log("💾 Saving user to localStorage:", userToStore);
          localStorage.setItem("user", JSON.stringify(userToStore));
        }
        
        
        toast.success("Login successful!");
        navigate("/");
      } else {
        console.log("❌ No accessToken in response");
      }
    } catch (error) {
      console.error("Login error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Login failed!");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <Container>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
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
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238l1.346 1.346a.5.5 0 0 1-.708.708l-1.344-1.344a8.447 8.447 0 0 1-4.653 1.493C3 13.44 0 8 0 8s1.41-2.175 3.252-3.948L1.5 2.448a.5.5 0 1 1 .707-.707l12 12a.5.5 0 0 1-.707.707l-1.141-1.141zM5.354 6.5a2.5 2.5 0 0 0 3.646 3.646l-3.646-3.646z" />
                  </svg>
                )}
              </span>
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/api/auth/register">Register now!</Link>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontWeight: "bold" }}
            >
              Login
            </button>
          </div>
        </form>
      </Container>
    </Background>
  );
};

export default LoginPage;
