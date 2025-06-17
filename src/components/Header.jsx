import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../i18n/lang";

const Header = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage(); // 👈 Lấy thêm setLang
  const t = (key) => translations[lang][key] || key; // 👈 Tạo hàm t()
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  {t("home")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shop" className="nav-link">
                  {t("shop")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  {t("about")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogs" className="nav-link">
                  {t("blog")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  {t("contact")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/tin-tuc" className="nav-link">
                  {t("news")}
                </NavLink>
              </li>

              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center btn btn-link"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ textDecoration: "none", color: "inherit" }}
                    type="button"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        user.username || user.email || "User"
                      }`}
                      alt="avatar"
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </button>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/me/profile/${user.id}`}
                      >
                        {t("profile")}
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href="#logout"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        {t("logout")}
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="api/auth/register" className="nav-link">
                      {t("register")}
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <div className="nav-link">
                  <ToggleTheme />
                </div>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="btn btn-sn btn-outline-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {lang.toUpperCase()}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setLang("vi")}
                    >
                      Tiếng Việt
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setLang("en")}
                    >
                      English
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
