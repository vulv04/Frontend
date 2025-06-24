import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useTranslation } from "react-i18next";

// Keyframes: chạy từ phải sang trái
const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Wrapper cho vùng chữ chạy
const BannerWrapper = styled.div`
  background-color: #000;
  color: #fff;
  overflow: hidden;
  height: 40px;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

// Track chứa cả 2 lần lặp text
const MarqueeTrack = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scroll} 20s linear infinite;
`;

// Văn bản được lặp
const MarqueeText = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding-right: 100px;
`;

const MultiLangMarquee = () => {
  const { t } = useTranslation();
  const lines = [
    t("banner.line1"),
    t("banner.line2"),
    t("banner.line3"),
  ];

  const fullText = lines.join("            "); // Dòng chữ đầy đủ

  return (
    <BannerWrapper>
      <MarqueeTrack>
        <MarqueeText>{fullText}</MarqueeText>
        <MarqueeText>{fullText}</MarqueeText>
      </MarqueeTrack>
    </BannerWrapper>
  );
};

export default MultiLangMarquee;
