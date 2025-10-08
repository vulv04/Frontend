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
import { Button, Rate, Card, Avatar } from "antd";

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

  const totalPages = Math.ceil(products.length / productsPerPage);

  // ✅ Hàm xem thêm (hiển thị thêm 1 trang sản phẩm mỗi lần bấm)
  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // ✅ Tính danh sách sản phẩm đang hiển thị
  const visibleItems = products.slice(0, currentPage * productsPerPage);

  // ✅ Dữ liệu giả cho phần đánh giá
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/100?img=1",
      rating: 5,
      comment: "Sản phẩm rất đẹp, chất lượng tốt, giao hàng nhanh!",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://i.pravatar.cc/100?img=2",
      rating: 4,
      comment: "Mình rất hài lòng, sẽ ủng hộ shop lần sau!",
    },
    {
      id: 3,
      name: "Lê Minh C",
      avatar: "https://i.pravatar.cc/100?img=3",
      rating: 5,
      comment: "Áo vừa vặn, màu sắc như hình, đáng tiền lắm!",
    },
  ];

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
            visibleItems.map((product, index) => {
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

        {/* ✅ Nút Xem thêm */}
        {!loading && !error && visibleItems.length < products.length && (
          <div className="text-center mt-4">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={handleShowMore}
            >
              Xem thêm
            </Button>
          </div>
        )}
      </section>

      {/* ✅ Phần đánh giá khách hàng */}
      <section className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Đánh giá từ khách hàng</h2>
        <div className="row g-4">
          {reviews.map((r) => (
            <div key={r.id} className="col-12 col-md-4">
              <Card bordered className="shadow-sm rounded-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <Avatar src={r.avatar} size={48} className="me-3" />
                  <div>
                    <h6 className="mb-0 fw-bold">{r.name}</h6>
                    <Rate disabled defaultValue={r.rating} />
                  </div>
                </div>
                <p className="text-muted fst-italic">"{r.comment}"</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProducts />
      <RecommendedProducts />
      <SpecialCollections />
    </div>
  );
};

export default HomePage;
