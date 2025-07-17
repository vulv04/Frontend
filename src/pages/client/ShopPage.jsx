import React, { useEffect, useState } from "react";
import SidebarFilter from "../../components/sidebar/SidebarFilter";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/products/ProductCard";
import { getProducts } from "../../api/productApi";
import Breadcrumb from "../../components/carts/Breadcrumb";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    search: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ListProducts = async () => {
    try {
      const res = await getProducts({
        _page: page,
        _limit: 6,
        q: filters.search,
        category: filters.category,
        brand: filters.brand,
      });

      console.log("✅ Dữ liệu từ API:", res.data);

      // Fix lỗi .map bằng cách đảm bảo luôn là mảng
      const productList = Array.isArray(res.data)
        ? res.data
        : res.data.products || res.data.data || [];

      setProducts(productList);

      const total =
        res.headers["x-total-count"] || res.data.total || productList.length;

      setTotalPages(Math.ceil(total / 6));
    } catch (err) {
      console.error("❌ Lỗi khi fetch sản phẩm:", err);
    }
  };

  useEffect(() => {
    ListProducts();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setPage(1);
  };

  return (
    <div className="container-fluid my-4">
      <div className="mb-3">
        <Breadcrumb items={[{ label: "Shop", link: "/shop" }]} />
      </div>

      <div className="row">
        {/* Sidebar filter */}
        <div className="col-md-3">
          <SidebarFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product list */}
        <div className="col-md-9">
          <h1>Sản phẩm</h1>
          <div className="row">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <div
                  className="col-sm-6 col-md-4 mb-4"
                  key={product._id || product.id}
                >
                  <Link
                    to={`/products/${product._id || product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <ProductCard
                      title={product.title}
                      description={product.description}
                      image={product.thumbnail || product.images?.[0] || ""}
                      price={product.price}
                      onAddToCart={() =>
                        handleAddToCart(product._id || product.id)
                      }
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nào.</p>
            )}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
