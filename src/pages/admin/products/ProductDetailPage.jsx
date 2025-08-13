import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../../api/productApi";
import { Spin, message, Tag, Button } from "antd";

const formatDate = (date) => {
  if (!date) return "Không rõ";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Không rõ";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        setProduct(res.data?.product || res.data);
      } catch {
        message.error("Không thể tải chi tiết sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spin size="large" />
      </div>
    );

  if (!product)
    return <div className="text-center py-5">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container py-4">
      <div className="mb-4">
        <Button onClick={() => navigate(-1)} type="default">
          ← Quay lại
        </Button>
      </div>

      <div className="card shadow border-0">
        <div className="row g-0">
          <div className="col-md-5 text-center p-4">
            <img
              src={product.thumbnail || product.images?.[0] || "/no-image.jpg"}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
              onError={(e) => (e.target.src = "/no-image.jpg")}
            />
            <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Ảnh ${idx + 1}`}
                  className="rounded"
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/no-image.jpg")}
                />
              ))}
            </div>
          </div>

          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>
              <p className="text-muted mb-2">
                Slug: <code>{product.slug}</code>
              </p>
              <p>
                <strong>Giá hiện tại:</strong> {product.price?.toLocaleString()}
                ₫
              </p>
              {product.oldPrice && product.oldPrice > product.price && (
                <p>
                  <strong>Giá cũ:</strong>{" "}
                  <del>{product.oldPrice?.toLocaleString()}₫</del>
                </p>
              )}
              {product.discountPercent && (
                <p>
                  <strong>Giảm giá:</strong> {product.discountPercent}%
                </p>
              )}
              <p>
                <strong>Danh mục:</strong> {product.category || "Chưa rõ"}
              </p>
              <p>
                <strong>Thương hiệu:</strong> {product.brand || "Chưa rõ"}
              </p>
              <p>
                <strong>Mô tả:</strong>{" "}
                {product.description || "Không có mô tả."}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {formatDate(product.createdAt)}
              </p>
              <p>
                <strong>Số biến thể:</strong> {product.variants?.length || 0}
              </p>
              {product.variants?.length > 0 && (
                <div className="mt-3">
                  <strong>Biến thể:</strong>
                  <ul className="mt-2">
                    {product.variants.map((v, i) => (
                      <li key={i}>
                        {v.color} - {v.size} ({v.stock} sp) -{" "}
                        {v.price?.toLocaleString()}₫
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
