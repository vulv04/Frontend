import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import CommentSection from "../../components/CommentSection";
import { addToCart } from "../../api/cartApi";
import { message } from "antd";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = async () => {
    try {
      if (!selectedColor || !selectedSize) {
        return message.error("Vui lòng chọn màu sắc và kích thước!");
      }

      const data = {
        productId: id,
        quantity,
        color: selectedColor,
        size: selectedSize,
      };

      await addToCart(data);
      message.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
      message.error("Không thể thêm vào giỏ hàng.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const data = res.data;
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || null);
        setSelectedColor(data.colors?.[0] || "");
        setSelectedSize(data.size?.[0] || "");
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
    colors = [],
    size = [],
    promoCodes = ["HELLO", "FREESHIP"],
  } = product;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={title || "Product"}
              className="img-fluid rounded border mb-3 w-100"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="text-center text-muted bg-light border mb-3"
              style={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Không có ảnh sản phẩm
            </div>
          )}

          <div className="d-flex gap-2">
            {[thumbnail, ...images].filter(Boolean).map((img, i) => (
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
          <h4>{title || "Đang tải..."}</h4>
          <div className="text-muted mb-2">
            {description || "Chưa có mô tả"}
          </div>
          {label && (
            <span className="badge bg-warning text-dark me-2">{label}</span>
          )}

          <div className="my-3">
            <span className="text-danger fs-4 fw-bold">
              {(price ?? 0).toLocaleString()}₫
            </span>{" "}
            {oldPrice && (
              <del className="text-muted">{oldPrice.toLocaleString()}₫</del>
            )}
          </div>

          <div className="mb-3">
            {(Array.isArray(promoCodes) ? promoCodes : []).map((code, i) => (
              <span key={i} className="badge bg-danger me-2">
                {code}
              </span>
            ))}
          </div>

          <div className="mb-3">
            <strong>Kích thước:</strong>
            <div className="d-flex gap-2 mt-2">
              {Array.isArray(size) && size.length > 0 ? (
                size.map((sz, i) => (
                  <button
                    key={i}
                    className={`btn ${
                      selectedSize === sz ? "btn-dark" : "btn-outline-secondary"
                    }`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))
              ) : (
                <div>Không có size</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <strong>Màu sắc:</strong>
            <div className="d-flex gap-2 mt-2">
              {colors.map((color, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border:
                      selectedColor === color
                        ? "3px solid #007bff"
                        : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  title={color}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-4">
            <input
              type="number"
              value={quantity}
              min={1}
              className="form-control"
              style={{ width: "80px" }}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="btn btn-outline-dark w-100"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
            <button className="btn btn-primary w-100">Mua ngay</button>
          </div>

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
            {description || "Không có mô tả sản phẩm"}
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
