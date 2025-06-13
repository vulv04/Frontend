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
  return (
    <FooterST>
      <Container>
        <Column>
          <Title>THÔNG TIN</Title>
          <Text>
            Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp
            từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt
            hơn nữa.
          </Text>
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
          <Text style={{ marginTop: "12px" }}>Follow chúng tôi:</Text>
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
          <Title>CHÍNH SÁCH</Title>
          <Link href="#">Chính sách thành viên</Link>
          <Link href="#">Chính sách vận chuyển</Link>
          <Link href="#">Chăm sóc khách hàng</Link>
          <Link href="#">Phương thức thanh toán</Link>
          <Link href="#">Chính sách đổi trả / bảo hành</Link>
        </Column>

        <Column>
          <Title>HƯỚNG DẪN</Title>
          <Link href="#">Denny Member</Link>
          <Link href="#">Mua hàng dễ dàng</Link>
          <Link href="#">Hợp tác nhượng quyền</Link>
          <Link href="#">Hướng dẫn mua hàng online</Link>
          <Link href="#">Hướng dẫn kiểm tra hạng thẻ thành viên</Link>
        </Column>

        <Column>
          <Title>ĐĂNG KÝ NHẬN TIN</Title>
          <EmailInput type="email" placeholder="Nhập địa chỉ email" />
          <Text>Hình thức thanh toán:</Text>
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/payment_1.png?1738662131654"
            alt="payment"
            style={{ margin: "8px 0" }}
          />
          <Text>Liên kết sàn:</Text>
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/shopee.png?1738662131654"
            alt="lienket"
          />
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/laz.png?1738662131654"
            alt="lienket"
          />
          <img
            src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/tiki.png?1738662131654"
            alt="lienket"
          />
          <img src="https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/sendo.png?1738662131654" />
        </Column>
      </Container>
      <BottomText>
        Copyright © <strong>Vukibo</strong>.
      </BottomText>
    </FooterST>
  );
};

export default Footer;
