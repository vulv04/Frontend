import React from "react";
import { Result, Button, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Paragraph, Text } = Typography;

const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goToOrders = () => navigate("/orders");

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
          <Button key="orders" onClick={goToOrders}>
            Xem đơn hàng của tôi
          </Button>,
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
