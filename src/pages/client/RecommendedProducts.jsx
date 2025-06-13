import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "../../api/productApi";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const data = res.data.products || res.data;
        setProducts(data);
      } catch (err) {
        setError("Không thể tải dữ liệu sản phẩm.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status" />
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Bạn có thể thích</h2>
      </div>
      <div className="row g-4">
        {products.slice(0, 4).map((product, index) => (
          <div
            key={product.id || index}
            className="col-6 col-sm-4 col-md-3 col-lg-3"
          >
            <div className="card border-0 h-100 position-relative shadow-sm">
              {/* Badge icon */}
              <span className="position-absolute top-0 start-0 m-2 badge bg-light text-danger border">
                <i className="bi bi-play-btn-fill me-1"></i>
              </span>
              <span className="position-absolute top-0 end-0 m-2 badge bg-light text-dark border">
                New
              </span>

              {/* Image */}
              <img
                src={product.thumbnail || product.images?.[0] || ""}
                alt={product.title}
                className="card-img-top img-fluid rounded"
                style={{ height: "200px", objectFit: "contain" }}
              />

              {/* Body */}
              <div className="card-body p-2">
                <h6 className="card-title small mb-1">{product.title}</h6>
                {product.description && (
                  <p className="card-text small text-muted">
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
