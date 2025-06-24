import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Thêm dòng này
import { useLanguage } from "../contexts/LanguageContext";

const FloatingLangSwitcher = styled.div`
  position: fixed;
  top: 200px;
  right: 0px;
  z-index: 1050;
`;

const GlobeButton = styled.button`
  background-color: #0d6efd;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0b5ed7;
  }
`;

const LanguageMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin-top: 5px;
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LanguageItem = styled.li`
  button {
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: none;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: #f1f1f1;
    }

    img {
      width: 20px;
      height: auto;
    }
  }
`;

const FloatingLangMenu = () => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation(); // 👈 Sử dụng i18n từ hook
  const { lang, setLang } = useLanguage();


  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);         // 👈 đổi ngôn ngữ
    localStorage.setItem("lang", lang); // 👈 lưu lại
    setLang(lang);                      // 👈 cập nhật context (BẮT BUỘC!)
    setOpen(false);
  };
  return (
    <FloatingLangSwitcher>
      <GlobeButton onClick={() => setOpen((prev) => !prev)}>
        <FaGlobe />
      </GlobeButton>
      {open && (
        <LanguageMenu>
          <LanguageItem>
            <button onClick={() => changeLanguage("vi")}>
              <img src="https://flagcdn.com/w40/vn.png" alt="VN" />
              Tiếng Việt
            </button>
          </LanguageItem>
          <LanguageItem>
            <button onClick={() => changeLanguage("en")}>
              <img src="https://flagcdn.com/w40/gb.png" alt="EN" />
              English
            </button>
          </LanguageItem>
        </LanguageMenu>
      )}
    </FloatingLangSwitcher>
  );
};

export default FloatingLangMenu;
