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
      className="product-card border rounded position-relative small-card p-2"
      onClick={onClickDetail}
      style={{ cursor: "pointer" }}
    >
      {/* Hình ảnh sản phẩm */}
      <div className="product-image-wrapper position-relative">
        <div className="badge-wrapper position-absolute top-0 start-0 w-100 d-flex justify-content-between p-2">
          <span className="badge bg-info text-white">FREESHIP</span>
          <span className="badge bg-danger">📺</span>
        </div>

        <img src={image} alt={title} className="img-fluid rounded" />

        {/* Icon hover giữa ảnh */}
        <div className="center-icons">
          <span className="circle-icon" onClick={() => onViewDetails()}>
            <FaSlidersH />
          </span>
          <span
            className="circle-icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Chặn click lan ra ngoài
              onQuickView(product);
            }}
          >
            <FaEye />
          </span>
          <span
            className="circle-icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Chặn click lan ra ngoài
              // Add action here (e.g., like)
            }}
          >
            <FaHeart />
          </span>
        </div>
      </div>

      <h6 className="product-title text-truncate mt-2">{title}</h6>
      <div className="text-muted small">
        {gender} - Size {size}
      </div>
      <div className="fw-bold text-danger">{price.toLocaleString()}₫</div>

      {variants?.length > 0 && (
        <div className="d-flex gap-1 mt-2">
          {variants.map((color, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: color,
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
            ></span>
          ))}
        </div>
      )}

      <div className="mt-2 d-flex gap-2">
        <span className="badge bg-purple text-white">{label} 9.9</span>
        <span className="badge bg-success text-white">
          <FaCheckCircle className="me-1" /> {promo}
        </span>
      </div>

      <div className="text-muted small mt-2">
        <FaFire className="text-warning me-1" />
        Đã bán {sold}
      </div>
    </div>
  );
};

export default ProductCard;
