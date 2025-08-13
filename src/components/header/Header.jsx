import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import translations from "../../i18n/lang";
import styled from "@emotion/styled";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiBell } from "react-icons/fi";
import { message } from "antd";
import CartIconWithBadge from "../CartIconWithBadge";
import { useCart } from "../../contexts/CartContext";
const StyledNavLink = styled(RouterNavLink)`
  position: relative;
  display: inline-block;
  padding: 8px 12px;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 0;
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 80%;
  }

  &:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
  }

  &.active {
    font-weight: bold;
    background-color: #e9ecef;
    border-radius: 5px;
  }
`;
const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #0056ff;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 50%;
  border: 2px solid white;
`;
const DropdownWrapper = styled.div`
  position: relative;
  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownContent = styled.ul`
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 999;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: 10px 15px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const SearchBox = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  background-color: white;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  animation: fadeIn 0.2s ease-in-out;

  input {
    width: 200px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .search-box {
    display: block;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage(); // 👈 Lấy thêm setLang
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef();
  const t = (key) => translations[lang][key] || key; // 👈 Tạo hàm t()
  const user = JSON.parse(localStorage.getItem("user"));
  const { totalQuantity } = useCart();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    message.success("Đăng xuất thành công!");
    navigate("api/auth/login");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            <img
              src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/logo.png?1738662131654"
              alt="Logo"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex align-items-center justify-content-between w-100">
              {/* Menu giữa */}
              <ul className="navbar-nav mx-auto d-flex gap-2">
                <li className="nav-item">
                  <StyledNavLink to="/" className="nav-link">
                    {t("home")}
                  </StyledNavLink>
                </li>
                <li className="nav-item">
                  <StyledNavLink to="/shop" className="nav-link">
                    {t("shop")}
                  </StyledNavLink>
                </li>
                <li className="nav-item">
                  <StyledNavLink to="/about" className="nav-link">
                    {t("about")}
                  </StyledNavLink>
                </li>
                <li className="nav-item">
                  <StyledNavLink to="/blogs" className="nav-link">
                    {t("blog")}
                  </StyledNavLink>
                </li>
                <li className="nav-item">
                  <StyledNavLink to="/contact" className="nav-link">
                    {t("contact")}
                  </StyledNavLink>
                </li>
                <li className="nav-item">
                  <StyledNavLink to="/news" className="nav-link">
                    {t("news")}
                  </StyledNavLink>
                </li>
              </ul>

              {/* Icon phải */}
              <IconGroup>
                <DropdownWrapper ref={searchRef}>
                  <IconWrapper onClick={() => setShowSearch((prev) => !prev)}>
                    <FiSearch />
                  </IconWrapper>
                  {showSearch && (
                    <SearchBox>
                      <input
                        type="text"
                        placeholder={t("search_placeholder") || "Search..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </SearchBox>
                  )}
                </DropdownWrapper>

                <DropdownWrapper>
                  <IconWrapper>
                    {user ? (
                      <img
                        src={`https://ui-avatars.com/api/?name=${
                          user.username || user.email || "User"
                        }`}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    ) : (
                      <FiUser />
                    )}
                  </IconWrapper>
                  <DropdownContent className="dropdown-content">
                    {user ? (
                      <>
                        <li onClick={() => navigate(`/me/profile/${user._id}`)}>
                          {t("profile")}
                        </li>
                        <li onClick={handleLogout}>{t("logout")}</li>
                      </>
                    ) : (
                      <>
                        <li onClick={() => navigate("/api/auth/login")}>
                          {t("login")}
                        </li>
                        <li onClick={() => navigate("/api/auth/register")}>
                          {t("register")}
                        </li>
                      </>
                    )}
                  </DropdownContent>
                </DropdownWrapper>
                <IconWrapper>
                  <FiHeart />
                  <Badge>0</Badge>
                </IconWrapper>
                <IconWrapper>
                  <FiBell />
                  <Badge>0</Badge>
                </IconWrapper>
                <IconWrapper>
                  <CartIconWithBadge />
                </IconWrapper>
              </IconGroup>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
