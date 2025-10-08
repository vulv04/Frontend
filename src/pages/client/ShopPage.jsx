import React, { useEffect, useState } from "react";
import SidebarFilter from "../../components/sidebar/SidebarFilter";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/products/ProductCard";
import { getProducts } from "../../api/productApi";
import Breadcrumb from "../../components/carts/Breadcrumb";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const list = Array.isArray(res.data)
        ? res.data
        : res.data.products || res.data.data || [];
      setAllProducts(list);
      setProducts(list);
      setTotalPages(Math.ceil(list.length / limit));
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    // Tìm kiếm theo tên sản phẩm
    if (filters.search) {
      const keyword = filters.search.toLowerCase().trim();
      result = result.filter((p) => p.title?.toLowerCase().includes(keyword));
    }

    // Danh mục
    if (filters.category) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Màu sắc (lọc theo variant)
    if (filters.color) {
      const colors = filters.color.split(",");
      result = result.filter((p) =>
        p.variants?.some((v) => colors.includes(v.color?.toLowerCase()))
      );
    }

    // Size (lọc theo variant)
    if (filters.size) {
      const sizes = filters.size.split(",");
      result = result.filter((p) =>
        p.variants?.some((v) => sizes.includes(v.size?.toUpperCase()))
      );
    }

    // Giá
    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Bộ sưu tập
    if (filters.collection) {
      result = result.filter(
        (p) => p.collection?.toLowerCase() === filters.collection.toLowerCase()
      );
    }

    setProducts(result);
    setTotalPages(Math.ceil(result.length / limit));
    setPage(1);
  }, [filters, allProducts]);

  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container-fluid my-4">
      <div className="mb-3">
        <Breadcrumb items={[{ label: "Shop", link: "/shop" }]} />
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <SidebarFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product list */}
        <div className="col-md-9">
          <h2 className="fw-bold mb-3">Tất cả sản phẩm</h2>
          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((p) => (
                <div className="col-sm-6 col-md-4 mb-4" key={p._id}>
                  <Link
                    to={`/products/${p._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <ProductCard
                      title={p.title}
                      description={p.description}
                      image={p.images?.[0]}
                      price={p.price}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nào phù hợp.</p>
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
