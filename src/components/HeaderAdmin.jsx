import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Styled components
const HeaderWrapper = styled.header`
  background-color: #282c34;
  color: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Username = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #e74c3c;
  }
`;

const HeaderAdmin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role?.toLowerCase() !== "admin") {
        navigate("/auth/login");
      } else {
        setUser(storedUser);
      }
    } catch (err) {
      navigate("/auth/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
  };

  if (!user) return null;

  return (
    <HeaderWrapper>
      <LeftSection>
        <Avatar
          src={`https://ui-avatars.com/api/?name=${user.username}`}
          alt="avatar"
        />
        <Username>Xin chào Admin, {user.username}</Username>
      </LeftSection>
      <LogoutButton onClick={handleLogout}>
        <FiLogOut />
        Logout
      </LogoutButton>
    </HeaderWrapper>
  );
};

export default HeaderAdmin;
