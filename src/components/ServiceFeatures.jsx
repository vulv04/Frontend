import React from "react";
import {
  FaShippingFast,
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={24} />,
    title: "Miễn phí vận chuyển",
    description: "Cho đơn hàng từ 500K",
  },
  {
    icon: <FaExchangeAlt size={24} />,
    title: "Đổi hàng tận nhà",
    description: "Trong vòng 7 ngày",
  },
  {
    icon: <FaMoneyCheckAlt size={24} />,
    title: "Thanh toán COD",
    description: "Hoặc thanh toán quét mã QR",
  },
  {
    icon: <FaPhoneAlt size={24} />,
    title: "Hotline: 19006750",
    description: "Hỗ trợ từ 08h00 đến 22h00",
  },
];

const ServiceFeatures = () => {
  return (
    <div className="container my-5">
      <div className="row text-center g-4">
        {features.map((feature, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div className="d-flex flex-column align-items-center">
              <div
                className="border border-primary rounded-circle d-flex justify-content-center align-items-center mb-2"
                style={{ width: 60, height: 60, color: "#0d6efd" }}
              >
                {feature.icon}
              </div>
              <h6 className="text-primary fw-bold mb-1">{feature.title}</h6>
              <p className="text-muted mb-0 small">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;
