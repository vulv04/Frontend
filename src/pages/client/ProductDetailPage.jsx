import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import CommentSection from "../../components/CommentSection";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        setSelectedImage(res.data.thumbnail || res.data.image);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return <div className="text-center my-5">Đang tải sản phẩm...</div>;

  const {
    title,
    thumbnail,
    images = [],
    description,
    price,
    oldPrice,
    label,
    promo,
    variants = [
      "#000000",
      "#FFFFFF",
      "#FF0000",
      "#00FF00",
      "#0000FF",
    ],
    sizes = [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
    ],
    promoCodes = ["HELLO", "FREESHIP"],
  } = product;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6">
          {/* Ảnh lớn */}
          <img
            src={selectedImage}
            alt={title}
            className="img-fluid rounded border mb-3 w-100"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />

          {/* Ảnh phụ */}
          <div className="d-flex gap-2">
            {[thumbnail, ...images].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                className="img-thumbnail"
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    img === selectedImage
                      ? "2px solid #007bff"
                      : "1px solid #ccc",
                }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h4>{title}</h4>
          <div className="text-muted mb-2">{description}</div>

          {label && (
            <span className="badge bg-warning text-dark me-2">{label}</span>
          )}

          <div className="my-3">
            <span className="text-danger fs-4 fw-bold">
              {price.toLocaleString()}₫
            </span>{" "}
            {oldPrice && (
              <del className="text-muted">{oldPrice.toLocaleString()}₫</del>
            )}
          </div>

          {/* Mã giảm giá */}
          <div className="mb-3">
            {promoCodes.map((code, i) => (
              <span key={i} className="badge bg-danger me-2">
                {code}
              </span>
            ))}
          </div>

          {/* Chọn size */}
          <div className="mb-3">
            <strong>Kích thước:</strong>
            <div className="d-flex gap-2 mt-2">
              {sizes.length
                ? sizes.map((sz, i) => (
                    <button key={i} className="btn btn-outline-secondary">
                      {sz}
                    </button>
                  ))
                : "Không có dữ liệu"}
            </div>
          </div>

          {/* Chọn màu sắc */}
          <div className="mb-3">
            <strong>Màu sắc:</strong>
            <div className="d-flex gap-2 mt-2">
              {variants.map((color, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>

          {/* Số lượng và nút */}
          <div className="d-flex align-items-center gap-2 mt-4">
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="form-control"
              style={{ width: "80px" }}
            />
            <button className="btn btn-outline-dark w-100">
             Thêm vào giỏ hàng
            </button>
            <button className="btn btn-primary w-100">Mua ngay</button>
          </div>

          {/* Icons tiện ích */}
          <div className="mt-4 row text-center small text-muted">
            <div className="col-4">🚚 Giao hàng nhanh 24h</div>
            <div className="col-4">🔄 Đổi trả 60 ngày</div>
            <div className="col-4">📞 Hotline hỗ trợ</div>
          </div>
        </div>
      </div>

      {/* Tabs mô tả/đánh giá */}
      <div className="mt-5">
        <ul className="nav nav-tabs" id="productTabs">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#desc">
              Mô tả sản phẩm
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#guide">
              Hướng dẫn mua hàng
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#reviews">
              Đánh giá
            </a>
          </li>
        </ul>
        <div className="tab-content border p-3">
          <div className="tab-pane fade show active" id="desc">
            {description}
          </div>
          <div className="tab-pane fade" id="guide">
            Liên hệ hỗ trợ hoặc đặt hàng nhanh qua hotline.
          </div>
          <div className="tab-pane fade" id="reviews">
            <CommentSection productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
