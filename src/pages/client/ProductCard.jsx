import React from "react";
import "./ProductCard.css"; // tạo thêm CSS cho định dạng đẹp hơn

const ProductCard = ({
  title,
  description,
  image,
  price,
  oldPrice,
  discountPercent,
  onAddToCart,
  variants = [],
  gender,
  size,
  label,
  promo,
}) => {
  return (
    <div className="card h-100 shadow-sm product-card">
      <div className="position-relative">
        {label && (
          <span className="badge bg-primary position-absolute top-0 start-0 m-2">
            {label}
          </span>
        )}
        <img
          src={image}
          className="card-img-top img-fluid"
          alt={title}
          style={{ objectFit: "cover", height: "300px" }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{title}</h6>
        <p className="text-muted small mb-1">
          {gender && `${gender} - `}Size {size || "Freesize"}
        </p>

        {/* Màu sắc */}
        {variants.length > 0 && (
          <div className="mb-2 d-flex gap-2">
            {variants.map((color, i) => (
              <div
                key={i}
                className="rounded-circle"
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: color,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        )}

        {/* Giá */}
        <div className="mb-2">
          <span className="fw-bold text-primary me-2">
            {price.toLocaleString()}₫
          </span>
          {oldPrice && (
            <small className="text-muted text-decoration-line-through">
              {oldPrice.toLocaleString()}₫
            </small>
          )}
          {discountPercent && (
            <span className="badge bg-danger ms-2">-{discountPercent}%</span>
          )}
        </div>

        {/* Mua 2 giảm thêm... */}
        {promo && <div className="text-success small mb-2">{promo}</div>}

        <button
          onClick={onAddToCart}
          className="btn btn-outline-primary mt-auto"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
