import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";

// ✅ Import icon Ant Design
import {
  HomeOutlined,
  AppstoreOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

// Styled components
const HeaderWrapper = styled.header`
  background-color: #ffffff;
  color: #000000;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 36px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #000000;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const IconButton = styled(NavLink)`
  color: #000;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: background-color 0.2s;
  text-decoration: none;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const HeaderAdmin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role?.toLowerCase() !== "admin") {
        navigate("/api/auth/login");
      } else {
        setUser(storedUser);
      }
    } catch (err) {
      navigate("/api/auth/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/api/auth/login");
  };

  if (!user) return null;

  return (
    <HeaderWrapper>
      <LeftSection>
        <NavLink to="/admin">
          <Logo
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/logo.png?1738662131654"
            alt="Logo"
          />
        </NavLink>
      </LeftSection>

      <RightSection>
        <IconButton to="/admin" title="Trang quản trị">
          <HomeOutlined />
        </IconButton>

        <IconButton to="/admin/variants" title="Biến thể sản phẩm">
          <AppstoreOutlined />
        </IconButton>

        <IconButton as="div" title="Thông báo">
          <BellOutlined />
        </IconButton>

        <IconButton as="div" title="Cài đặt">
          <SettingOutlined />
        </IconButton>

        <Avatar
          src={`https://ui-avatars.com/api/?name=${user.username}`}
          alt="avatar"
        />
        <Username>Xin chào Admin, {user.username}</Username>

        <LogoutButton onClick={handleLogout}>
          <LogoutOutlined />
          Logout
        </LogoutButton>
      </RightSection>
    </HeaderWrapper>
  );
};

export default HeaderAdmin;
