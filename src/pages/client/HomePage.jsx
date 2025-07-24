import React, { useEffect, useState } from "react";
import ServiceFeatures from "../../components/ServiceFeatures";
import SearchBarWithTags from "../../components/SearchBarWithTags";
import FeaturedProducts from "./FeaturedProducts";
import RecommendedProducts from "../../components/products/RecommendedProducts";
import SpecialCollections from "./SpecialCollections";
import { getProducts } from "../../api/productApi";
import { useTranslation } from "react-i18next";
import ProductCard from "../../components/products/ProductCard";
import Banner from "../../components/banner/Banner";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "../../components/QuickViewModal";
import OneTimeComponents from "../../components/OneTimeComponents";

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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await getProducts();

        // Đảm bảo data luôn là array
        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : typeof data === "object" && data !== null
          ? Object.values(data)
          : [];

        const activeProducts = productList.filter((p) => !p.isDeleted);
        setProducts(activeProducts);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
        setError(err.message || "Không thể tải sản phẩm");
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

        <div className="mb-4">
          <h2>Sản phẩm mới</h2>
        </div>

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

        <OneTimeComponents />

        <div className="row">
          {!loading &&
            !error &&
            currentItems.map((product, index) => {
              const { id, _id, title, thumbnail, price, images } = product;
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
                    variants={product.variants || []}
                    colors={product.variants?.map((v) => v.color) || []}
                    sold={product.sold || 0}
                    onViewDetails={() => nav(`/products/${product._id}`)}
                    onQuickView={() => handleQuickView(product)}
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

        {!loading && !error && totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <span
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {t("previous")}
                </span>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <span
                    className="page-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </span>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <span
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {t("next")}
                </span>
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
