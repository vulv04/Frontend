import React, { useEffect, useState } from "react";
// import Banner from "../../components/Banner";
import ServiceFeatures from "../../components/ServiceFeatures";
import SearchBarWithTags from "../../components/SearchBarWithTags";
import FeaturedProducts from "./FeaturedProducts";
import RecommendedProducts from "./RecommendedProducts";
import SpecialCollections from "./SpecialCollections";
import { getProducts } from "../../api/productApi";
import { useTranslation } from "react-i18next";
import PopupAd from "../../components/PopupAd";
import FloatingNotification from "../../components/FloatingNotification";
import ProductCard from "../../components/ProductCard";
import Banner from "../../components/Banner";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "../../components/QuickViewModal";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const nav = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

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
        <h1 className="mb-4 text-center">{t("welcome_title")}</h1>
        <p className="text-center lead mb-5">{t("welcome_subtitle")}</p>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border" role="status" />
            <p>{t("loading")}</p>
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-center">{t("no_products")}</p>
        )}
        <FloatingNotification />
        <PopupAd />
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
                <div
                  key={id || _id || index}
                  className="col-6 col-sm-4 col-md-3 col-lg-2-4 mb-4"
                >
                  <ProductCard
                    title={title}
                    image={thumbnail || images?.[0]}
                    price={price}
                    gender={product.gender}
                    size={product.size}
                    label={product.label}
                    promo={product.promo}
                    variants={product.colors}
                    sold={product.sold || 0}
                    onViewDetails={() => nav(`/products/${product._id}`)}
                    onQuickView={(p) => handleQuickView(p)}
                    onClickDetail={() => nav(`/products/${product._id}`)}
                  />
                </div>
              );
            })}
        </div>
        <QuickViewModal
          show={!!quickViewProduct}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{t("previous")}</span>
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
                <span className="page-link">{t("next")}</span>
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
