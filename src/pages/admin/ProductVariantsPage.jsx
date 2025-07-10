import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import { message } from "antd";

const ProductVariantsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products || res.data);
    } catch (error) {
      message.error("Không thể tải danh sách sản phẩm");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2>Biến thể sản phẩm</h2>

      {/* Tìm kiếm */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Danh sách biến thể */}
      <div className="accordion" id="variantAccordion">
        {filtered.map((product) => (
          <div className="accordion-item" key={product._id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${product._id}`}
              >
                {product.title}
              </button>
            </h2>
            <div
              id={`collapse-${product._id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#variantAccordion"
            >
              <div className="accordion-body">
                {product.variants && product.variants.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Màu</th>
                        <th>Size</th>
                        <th>Tồn kho</th>
                        <th>SKU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((variant, idx) => (
                        <tr key={idx}>
                          <td>{variant.color}</td>
                          <td>{variant.size}</td>
                          <td>{variant.stock}</td>
                          <td>{variant.sku}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted">Không có biến thể nào.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantsPage;
