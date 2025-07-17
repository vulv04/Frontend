import React, { useEffect, useState } from "react";
import { createVariant } from "../../api/variantApi";
import { getProducts } from "../../api/productApi";
import { message } from "antd";

const VariantFormPage = () => {
  const [products, setProducts] = useState([]);
  const [newVariant, setNewVariant] = useState({
    productId: "",
    color: "",
    sizes: "",
    price: "",
    stock: "",
    sku: "",
    images: "",
  });

  // Lấy danh sách sản phẩm cho dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const data = res.data.products || res.data;
        setProducts(data);
      } catch (err) {
        message.error("Lỗi khi tải danh sách sản phẩm");
      }
    };
    fetchProducts();
  }, []);

  const handleAddVariant = async () => {
    const { productId, color, sizes, stock, price, sku, images } = newVariant;

    if (!productId || !color || !sizes || !stock || !price || !sku) {
      return message.warning("Vui lòng nhập đầy đủ thông tin bắt buộc");
    }

    const sizeList = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      for (const size of sizeList) {
        await createVariant({
          productId,
          color,
          size,
          stock: Number(stock),
          price: Number(price),
          sku: `${sku}-${size}`,
          images: images ? images.split(",").map((img) => img.trim()) : [],
        });
      }

      message.success("Tạo biến thể thành công!");
      setNewVariant({
        productId: "",
        color: "",
        sizes: "",
        stock: "",
        price: "",
        sku: "",
        images: "",
      });
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi tạo biến thể");
    }
  };

  return (
    <div className="container py-4">
      <h2>🧩 Thêm biến thể sản phẩm</h2>

      <div className="row g-3 mt-3">
        {/* Sản phẩm */}
        <div className="col-md-4">
          <label className="form-label">Sản phẩm</label>
          <select
            className="form-select"
            value={newVariant.productId}
            onChange={(e) =>
              setNewVariant({ ...newVariant, productId: e.target.value })
            }
          >
            <option value="">-- Chọn sản phẩm --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Màu */}
        <div className="col-md-4">
          <label className="form-label">Màu sắc</label>
          <input
            type="text"
            className="form-control"
            placeholder="red, blue..."
            value={newVariant.color}
            onChange={(e) =>
              setNewVariant({ ...newVariant, color: e.target.value })
            }
          />
          {newVariant.color && (
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: newVariant.color,
                border: "1px solid #ccc",
                marginTop: "8px",
              }}
              title={newVariant.color}
            ></div>
          )}
        </div>

        {/* Kích thước */}
        <div className="col-md-4">
          <label className="form-label">Kích thước</label>
          <input
            type="text"
            className="form-control"
            placeholder="S, M, L"
            value={newVariant.sizes}
            onChange={(e) =>
              setNewVariant({ ...newVariant, sizes: e.target.value })
            }
          />
        </div>

        {/* Giá */}
        <div className="col-md-4">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ví dụ: 199000"
            value={newVariant.price}
            onChange={(e) =>
              setNewVariant({ ...newVariant, price: e.target.value })
            }
          />
        </div>

        {/* Tồn kho */}
        <div className="col-md-4">
          <label className="form-label">Tồn kho</label>
          <input
            type="number"
            className="form-control"
            placeholder="Số lượng"
            min={0}
            value={newVariant.stock}
            onChange={(e) =>
              setNewVariant({ ...newVariant, stock: e.target.value })
            }
          />
        </div>

        {/* SKU */}
        <div className="col-md-4">
          <label className="form-label">SKU</label>
          <input
            type="text"
            className="form-control"
            placeholder="Mã SKU"
            value={newVariant.sku}
            onChange={(e) =>
              setNewVariant({ ...newVariant, sku: e.target.value })
            }
          />
        </div>

        {/* Ảnh */}
        <div className="col-md-12">
          <label className="form-label">
            Ảnh (URL, cách nhau bởi dấu phẩy)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="https://example.com/image1.jpg, https://..."
            value={newVariant.images}
            onChange={(e) =>
              setNewVariant({ ...newVariant, images: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-success" onClick={handleAddVariant}>
          Tạo biến thể
        </button>
      </div>
    </div>
  );
};

export default VariantFormPage;
