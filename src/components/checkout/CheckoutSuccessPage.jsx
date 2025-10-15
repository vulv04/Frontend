import React from "react";
import { Result, Button, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

const { Paragraph, Text } = Typography;

const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <div style={{ padding: "48px 16px", minHeight: "80vh" }}>
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi."
        extra={[
          <Button type="primary" key="home" onClick={goHome}>
            Về trang chủ
          </Button>,
           <Link to={`/orders/${orderId}`}>
            <Button key="orders">Xem đơn hàng của tôi</Button>,
          </Link>,
        ]}
      >
        {orderId && (
          <Paragraph style={{ marginTop: 24 }}>
            Mã đơn hàng của bạn là:{" "}
            <Text copyable strong>
              {orderId}
            </Text>
          </Paragraph>
        )}
      </Result>
    </div>
  );
};

export default CheckoutSuccessPage;
