import React, { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import ProductQuickView from "../../components/QuickViewModal";
import { getProducts } from "../../api/productApi";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const data = res.data.products || res.data;
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Tất cả sản phẩm</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {products.length === 0 ? (
          <div className="text-center w-100">Không có sản phẩm</div>
        ) : (
          products.map((product) => {
            const firstVariant = product.variants?.[0];
            return (
              <div className="col" key={product._id}>
                <ProductCard
                  title={product.title}
                  image={
                    product.thumbnail ||
                    product.images?.[0] ||
                    firstVariant?.images?.[0]
                  }
                  price={firstVariant?.price || product.price}
                  oldPrice={product.oldPrice}
                  gender={product.gender}
                  size={firstVariant?.size}
                  color={firstVariant?.color}
                  label={product.label}
                  promo={product.promo}
                  variants={product.variants}
                  sold={product.sold || 0}
                  onQuickView={() => setQuickViewProduct(product)}
                />
              </div>
            );
          })
        )}
      </div>

      {/* Modal Quick View */}
      <ProductQuickView
        show={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
};

export default ProductListPage;
