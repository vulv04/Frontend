import React from "react";
import styled from "@emotion/styled";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FooterST = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 40px 20px 20px;
  font-size: 14px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1 1 220px;
  margin: 10px 0;
`;

const Title = styled.h4`
  font-weight: bold;
  margin-bottom: 16px;
`;

const Text = styled.p`
  line-height: 1.6;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  svg {
    margin-right: 8px;
  }
`;

const Link = styled.a`
  display: block;
  color: #fff;
  margin-bottom: 8px;
  text-decoration: none;
  &:hover {
    color: #ffc107;
  }
`;

const EmailInput = styled.input`
  padding: 8px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  color: #fff;
  margin-bottom: 12px;
  outline: none;
`;

const IconRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;

  a {
    color: #fff;
    font-size: 20px;
    &:hover {
      color: #ffc107;
    }
  }
`;

const BottomText = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.8;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterST>
      <Container>
        <Column>
          <Title>{t("footer.information")}</Title>
          <Text>{t("footer.description")}</Text>
          <InfoItem>
            <FaMapMarkerAlt />
            So 4 Tan My, MY Dinh 2, Nam Tu Liem, Ha Noi
          </InfoItem>
          <InfoItem>
            <FaPhoneAlt />
            0866501234
          </InfoItem>
          <InfoItem>
            <FaEnvelope />
            support@vukibo.vn
          </InfoItem>
          <Text style={{ marginTop: "12px" }}>{t("footer.follow_us")}</Text>
          <IconRow>
            <a href="#">
              <FaYoutube />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaPinterest />
            </a>
          </IconRow>
        </Column>

        <Column>
          <Title>{t("footer.policy")}</Title>
          <Link href="#">{t("footer.member_policy")}</Link>
          <Link href="#">{t("footer.shipping_policy")}</Link>
          <Link href="#">{t("footer.customer_service")}</Link>
          <Link href="#">{t("footer.payment_methods")}</Link>
          <Link href="#">{t("footer.return_policy")}</Link>
        </Column>

        <Column>
          <Title>{t("footer.guide")}</Title>
          <Link href="#">{t("footer.denny_member")}</Link>
          <Link href="#">{t("footer.easy_buy")}</Link>
          <Link href="#">{t("footer.franchise")}</Link>
          <Link href="#">{t("footer.online_guide")}</Link>
          <Link href="#">{t("footer.check_member")}</Link>
        </Column>

        <Column>
          <Title>{t("footer.newsletter")}</Title>
          <EmailInput type="email" placeholder={t("footer.enter_email")} />
          <Text>{t("footer.payment_form")}</Text>
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/payment_1.png?1738662131654"
            alt="payment"
            style={{ margin: "8px 0" }}
          />
          <Text>{t("footer.platform_links")}</Text>
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/shopee.png?1738662131654"
            alt="shopee"
          />
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/laz.png?1738662131654"
            alt="lazada"
          />
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/tiki.png?1738662131654"
            alt="tiki"
          />
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/sendo.png?1738662131654"
            alt="sendo"
          />
        </Column>
      </Container>
      <BottomText>
        Copyright © <strong>Vukibo</strong>.
      </BottomText>
    </FooterST>
  );
};

export default Footer;
