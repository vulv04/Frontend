import React, { useEffect, useState } from "react";
import { getVariants, deleteVariant } from "../../api/variantApi";
import { message, Spin, Tag, Button, Popconfirm } from "antd";

const ProductVariantsPage = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const res = await getVariants();
      setVariants(res.data.variants || res.data || []);
    } catch (err) {
      message.error("Lỗi khi tải danh sách biến thể!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVariant(id);
      if (window.confirm("Xóa biến thể nây?")) {
        message.success("Xóa biến thể thành công!");
      }
      setVariants((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      message.error("Xóa thất bại");
    }
  };

  const filtered = variants.filter((v) => {
    const matchSearch =
      v.sku?.toLowerCase().includes(search.toLowerCase()) ||
      v.color?.toLowerCase().includes(search.toLowerCase()) ||
      v.size?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = activeOnly ? v.isActive : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="container py-4">
      <h2 className="mb-4">🧩 Danh sách biến thể sản phẩm</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo SKU, màu, size..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
            />
            Chỉ hiển thị biến thể đang hoạt động
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : (
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>SKU</th>
              <th>Màu</th>
              <th>Size</th>
              <th>Giá</th>
              <th>Kho</th>
              <th>Ảnh</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v._id}>
                <td>{v.sku}</td>
                <td>{v.color}</td>
                <td>{v.size}</td>
                <td>{v.price?.toLocaleString()}₫</td>
                <td>{v.stock}</td>
                <td>
                  <img
                    src={v.images?.[0] || "/no-image.jpg"}
                    alt="Variant"
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                    className="img-thumbnail"
                    onError={(e) => (e.target.src = "/no-image.jpg")}
                  />
                </td>
                <td>
                  {v.isActive ? (
                    <Tag color="green">Đang hoạt động</Tag>
                  ) : (
                    <Tag color="red">Ngưng hoạt động</Tag>
                  )}
                </td>
                <td>
                  <Popconfirm
                    title="Xóa biến thể này?"
                    onConfirm={() => handleDelete(v._id)}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button danger size="small">
                      Xóa
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-muted">
                  Không tìm thấy biến thể nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductVariantsPage;
