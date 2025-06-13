import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import CommentSection from "../../components/CommentSection";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);
  if (!product) return <div>Đang tải sản phẩm...</div>;

  const {
    title,
    description,
    image,
    price,
    oldPrice,
    label,
    promo,
    variants,
    gender,
    size,
    onAddToCart,
  } = product;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6">
          <img
            src={image}
            alt={title}
            className="img-fluid rounded shadow-sm"
          />
          {/* Biến thể màu sắc */}
          {variants?.length > 0 && (
            <div className="d-flex gap-2 mt-3">
              {variants.map((color, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  title={color}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2>{title}</h2>
          <p className="text-muted">{description}</p>

          {/* Hiển thị nhãn */}
          {label && <span className="badge bg-warning text-dark">{label}</span>}

          {/* Giá */}
          <h4 className="mt-3">
            <span className="text-danger fw-bold">
              {price.toLocaleString()}₫
            </span>{" "}
            {oldPrice && (
              <del className="text-muted">{oldPrice.toLocaleString()}₫</del>
            )}
          </h4>

          {/* Khuyến mãi */}
          {promo && <p className="text-success mt-2">{promo}</p>}

          {/* Giới tính và kích thước */}
          <p className="mt-3">
            <strong>Giới tính:</strong> {gender || "Không xác định"}
          </p>
          <p>
            <strong>Kích thước:</strong> {size || "Tùy chọn"}
          </p>

          <button
            className="btn btn-primary mt-4"
            onClick={onAddToCart || (() => alert("Đã thêm vào giỏ hàng!"))}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <CommentSection productId={id} />
    </div>
  );
};

export default ProductDetailPage;
