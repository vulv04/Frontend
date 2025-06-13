const ProductCard = ({
  title,
  description,
  image,
  price,
  oldPrice,
  discountPercent,
  gender,
  size,
  label,
  promo,
  variants,
  onAddToCart,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h5>{title}</h5>
      <p>{description}</p>

      {/* Hiển thị giá */}
      <p>
        <span className="text-danger fw-bold">{price.toLocaleString()}₫</span>{" "}
        {oldPrice && (
          <del className="text-muted">{oldPrice.toLocaleString()}₫</del>
        )}
      </p>

      {/* Hiển thị nhãn giảm giá nếu có */}
      {label && <span className="badge bg-warning text-dark">{label}</span>}

      {/* Hiển thị mô tả khuyến mãi */}
      {promo && <p className="text-success">{promo}</p>}

      {/* Hiển thị các biến thể màu sắc */}
      {variants?.length > 0 && (
        <div className="d-flex gap-2 mt-2">
          {variants.map((color, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: color,
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
            ></span>
          ))}
        </div>
      )}

      <button className="btn btn-primary mt-3" onClick={onAddToCart}>
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
