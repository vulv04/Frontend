import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { getVariantsByProductId } from "../../api/variantApi";
import { addToCart } from "../../api/cartApi";
import { message } from "antd";
import CommentSection from "../comments/CommentSection";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [variants, setVariants] = useState([]);
  const [sku, setSku] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const data = res.data;
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || null);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };

    const fetchVariants = async () => {
      try {
        const res = await getVariantsByProductId(id);
        const variantList = res.data.variants || res.data;
        setVariants(variantList);

        if (variantList.length > 0) {
          setSelectedColor(variantList[0].color);
          setSelectedSize(variantList[0].size);
          setSku(variantList[0].sku || "");
        }
      } catch (err) {
        console.error("Lỗi khi lấy biến thể:", err);
      }
    };

    fetchProduct();
    fetchVariants();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize || !sku) {
      return message.error("Vui lòng chọn đầy đủ màu sắc và kích thước!");
    }

    try {
      await addToCart({
        productId: id,
        quantity,
        color: selectedColor,
        size: selectedSize,
        sku,
      });
      message.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Không thể thêm vào giỏ hàng.");
    }
  };

  if (!product) {
    return <div className="text-center my-5">Đang tải sản phẩm...</div>;
  }

  const {
    title,
    thumbnail,
    images = [],
    description,
    price,
    oldPrice,
    label,
    promoCodes = ["HELLO", "FREESHIP"],
  } = product;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Ảnh sản phẩm */}
        <div className="col-md-6">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={title}
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

          <div className="d-flex gap-2 flex-wrap">
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
          <h4>{title}</h4>
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
            {promoCodes.map((code, i) => (
              <span key={i} className="badge bg-danger me-2">
                {code}
              </span>
            ))}
          </div>

          {/* Màu sắc */}
          <div className="mb-3">
            <strong>Màu sắc:</strong>
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {[...new Set(variants.map((v) => v.color))].map((color, i) => (
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
                  onClick={() => {
                    setSelectedColor(color);
                    // reset size + sku khi đổi màu
                    const firstSize = variants.find((v) => v.color === color);
                    setSelectedSize(firstSize?.size || "");
                    setSku(firstSize?.sku || "");
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Kích thước */}
          <div className="mb-3">
            <strong>Kích thước:</strong>
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {variants
                .filter((v) => v.color === selectedColor)
                .map((v, i) => (
                  <button
                    key={i}
                    className={`btn ${
                      selectedSize === v.size
                        ? "btn-dark"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => {
                      setSelectedSize(v.size);
                      setSku(v.sku || "");
                    }}
                  >
                    {v.size}
                  </button>
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

      {/* Tabs */}
      <ul className="nav nav-tabs mt-5" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="desc-tab"
            data-bs-toggle="tab"
            data-bs-target="#desc"
            type="button"
            role="tab"
          >
            Mô tả
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="guide-tab"
            data-bs-toggle="tab"
            data-bs-target="#guide"
            type="button"
            role="tab"
          >
            Hướng dẫn
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="reviews-tab"
            data-bs-toggle="tab"
            data-bs-target="#reviews"
            type="button"
            role="tab"
          >
            Đánh giá
          </button>
        </li>
      </ul>

      <div className="tab-content border p-3">
        <div
          className="tab-pane fade show active"
          id="desc"
          role="tabpanel"
          aria-labelledby="desc-tab"
        >
          {description || "Không có mô tả sản phẩm"}
        </div>
        <div
          className="tab-pane fade"
          id="guide"
          role="tabpanel"
          aria-labelledby="guide-tab"
        >
          Liên hệ hỗ trợ hoặc đặt hàng nhanh qua hotline.
        </div>
        <div
          className="tab-pane fade"
          id="reviews"
          role="tabpanel"
          aria-labelledby="reviews-tab"
        >
          <CommentSection productId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
