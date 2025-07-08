import React from "react";
import { Button, Row, Col } from "antd";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";

const SocialLoginButtons = () => {
  return (
    <Row gutter={16} className="mt-3">
      <Col>
        <Button
          type="primary"
          icon={<FacebookFilled />}
          style={{
            backgroundColor: "#3b5998",
            borderColor: "#3b5998",
            minWidth: "120px",
          }}
          onClick={() => window.open("/auth/facebook", "_self")}
        >
          Facebook
        </Button>
      </Col>
      <Col>
        <Button
          type="primary"
          icon={<GoogleOutlined />}
          style={{
            backgroundColor: "#db4a39",
            borderColor: "#db4a39",
            minWidth: "120px",
          }}
          onClick={() => window.open("/auth/google", "_self")}
        >
          Google
        </Button>
      </Col>
    </Row>
  );
};

export default SocialLoginButtons;
