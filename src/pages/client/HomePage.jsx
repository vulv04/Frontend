import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import ServiceFeatures from "../../components/ServiceFeatures";
import SearchBarWithTags from "../../components/SearchBarWithTags";
import FeaturedProducts from "./FeaturedProducts";
import RecommendedProducts from "./RecommendedProducts";
import SpecialCollections from "./SpecialCollections";
import { getProducts } from "../../api/productApi";
import { cartApi } from "../../api/cartApi";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async (data) => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProducts();
        console.log(res);
        const data = res.data.products || res.data;
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleAddToCart = async () => {
    try {
      const res = await cartApi({ productId: products._id });
      console.log("Đã thêm vào giỏ:", res.data);
      // dispatch hoặc cập nhật UI nếu cần
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ:", err);
    }
  };
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Banner />
      <ServiceFeatures />
      <SearchBarWithTags />
      <section className="container my-5">
        <h1 className="mb-4 text-center">
          Chào mừng đến với Cửa hàng của chúng tôi
        </h1>
        <p className="text-center lead mb-5">
          Khám phá bộ sưu tập sản phẩm chất lượng cao được chúng tôi tuyển chọn
          kỹ lưỡng dành riêng cho bạn.
        </p>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border" role="status" />
            <p>Loading products...</p>
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-center">No products available.</p>
        )}

        <div className="row">
          {!loading &&
            !error &&
            currentItems.map((product, index) => {
              const {
                id,
                _id, // nếu dùng MongoDB
                title,
                description,
                thumbnail,
                price,
                images,
              } = product;

              return (
                <div key={id || _id || index} className="col-md-4 mb-4">
                  <Link
                    to={`/products/${_id}`}
                    className="text-decoration-none text-dark"
                  >
                    <ProductCard
                      title={title}
                      description={description}
                      image={thumbnail || images?.[0]}
                      price={price}
                      oldPrice={product.oldPrice}
                      discountPercent={product.discountPercent}
                      gender={product.gender}
                      size={product.size}
                      label={product.label}
                      promo={product.promo}
                      variants={product.colors}
                      onAddToCart={() => handleAddToCart(_id || id)}
                    />
                  </Link>
                </div>
              );
            })}
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">Previous</span>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="page-link">{i + 1}</span>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">Next</span>
              </li>
            </ul>
          </nav>
        )}
      </section>
      <FeaturedProducts />
      <RecommendedProducts />
      <SpecialCollections />
    </div>
  );
};

export default HomePage;
