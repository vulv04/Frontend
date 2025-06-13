import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import Breadcrumb from "../../components/Breadcrumb";

const AboutPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data.products || res.data);
      } catch (err) {
        setError(err.message || "Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="container my-5">
      <div className="mb-3">
        <Breadcrumb items={[{ label: "Giới thiệu", link: "/about" }]} />
      </div>
      {/* Phần giới thiệu công ty */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Về chúng tôi"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-4">Về Chúng Tôi</h1>
          <p className="lead">
            Tại <strong>Denny Fashion</strong>, chúng tôi cung cấp các sản phẩm
            chất lượng cao, đáp ứng nhu cầu và vượt trên mong đợi của bạn.
          </p>
          <p>
            Kể từ khi thành lập, sứ mệnh của chúng tôi là kết hợp chất lượng, sự
            đổi mới và sự hài lòng của khách hàng để mang đến trải nghiệm tốt
            nhất.
          </p>
          <ul>
            <li>Dải sản phẩm đa dạng và đáng tin cậy</li>
            <li>Hỗ trợ khách hàng tận tâm</li>
            <li>Hoạt động kinh doanh đạo đức</li>
            <li>Cam kết cải tiến không ngừng</li>
          </ul>
          <p>
            Muốn biết thêm chi tiết? Vui lòng{" "}
            <a href="/contact">liên hệ với chúng tôi</a>.
          </p>
        </div>
      </div>

      {/* Sản phẩm nổi bật */}
      <div>
        <h2 className="mb-4">Sản Phẩm Nổi Bật</h2>

        {loading && <p>Đang tải sản phẩm...</p>}
        {error && <p className="text-danger">Lỗi: {error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}

        <div className="row">
          {!loading &&
            !error &&
            products.slice(0, 6).map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-truncate">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <span className="fw-bold text-primary fs-5">
                        {product.price.toLocaleString()}₫
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
