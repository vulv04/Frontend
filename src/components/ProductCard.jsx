import React from "react";
import {
  FaCheckCircle,
  FaFire,
  FaSlidersH,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import "../assets/css/ProductCard.css";

const ProductCard = ({
  title,
  image,
  price,
  gender,
  size,
  label = "Siêu Sale",
  promo = "Đồng kiểm",
  variants = [],
  sold = 0,
  onQuickView = () => {},
  onClickDetail = () => {},
}) => {
  const product = {
    title,
    image,
    price,
    gender,
    size,
    label,
    promo,
    variants,
    sold,
  };

  return (
    <div
      className="product-card border rounded-4 position-relative shadow-sm overflow-hidden"
      onClick={onClickDetail}
      style={{ cursor: "pointer", backgroundColor: "#fff" }}
    >
      {/* Hình ảnh sản phẩm */}
      <div className="product-image-wrapper position-relative">
        <img
          src={image}
          alt={title}
          className="img-fluid w-100 rounded-top-4 product-image"
        />

        {/* Badge góc ảnh */}
        {/* Góc trên bên trái */}
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-danger shadow-sm fw-semibold">
            🔥 {label}
          </span>
        </div>

        {/* Góc trên bên phải */}
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-primary shadow-sm">FREESHIP</span>
        </div>

        {/* Icon hover */}
        <div className="position-absolute top-50 start-50 translate-middle d-flex gap-2 icons-hover">
          <span
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClickDetail(product);
            }}
          >
            <FaSlidersH />
          </span>
          <span
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <FaEye />
          </span>
          <span
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaHeart />
          </span>
        </div>
      </div>

      <div className="p-3">
        <h6 className="product-title text-truncate mb-1">{title}</h6>
        <div className="text-muted small mb-1">
          {gender} - Size {size}
        </div>
        <div className="fw-bold text-danger mb-2 fs-6">
          {price.toLocaleString()}₫
        </div>

        {variants?.length > 0 && (
          <div className="d-flex gap-1 mb-2">
            {variants.map((color, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: color,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              ></span>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="badge bg-success d-flex align-items-center gap-1">
            <FaCheckCircle /> {promo}
          </span>
          <span className="text-muted small d-flex align-items-center gap-1">
            <FaFire className="text-warning" />
            Đã bán {sold}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
