import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  restoreProduct,
  hardDeleteProduct,
} from "../../../api/productApi";
import { message, Spin } from "antd";
import { FaArrowLeft, FaTrashRestore, FaTrashAlt } from "react-icons/fa";

const ProductTrashPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      const data = res.data?.products || res.data?.data || res.data || [];
      const allProducts = Array.isArray(data) ? data : Object.values(data);
      const deletedProducts = allProducts.filter((p) => p.isDeleted);
      setProducts(deletedProducts);
    } catch {
      message.error("Lỗi khi tải danh sách thùng rác");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRestore = async (id) => {
    setProcessingId(id);
    try {
      await restoreProduct(id);
      message.success("Khôi phục thành công!");
      await fetchData();
    } catch {
      message.error("Khôi phục thất bại");
    }
    setProcessingId(null);
  };

  const handleHardDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này?")) return;

    setProcessingId(id);
    try {
      await hardDeleteProduct(id);
      message.success("Đã xóa vĩnh viễn sản phẩm!");
      await fetchData();
    } catch {
      message.error("Xóa vĩnh viễn thất bại");
    }
    setProcessingId(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🗑️ Thùng rác sản phẩm</h2>
        <Link to="/admin/products" className="btn btn-sm btn-secondary">
          <FaArrowLeft /> Quay lại danh sách
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-muted text-center py-5">
          Không có sản phẩm nào trong thùng rác.
        </div>
      ) : (
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Tên</th>
              <th>Giá</th>
              <th>Ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.price?.toLocaleString()}₫</td>
                <td>
                  <img
                    src={p.images?.[0] || "/no-image.jpg"}
                    alt={p.title}
                    className="img-thumbnail"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/no-image.jpg")}
                  />
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleRestore(p._id)}
                      className="btn btn-sm btn-outline-success"
                      disabled={processingId === p._id}
                    >
                      {processingId === p._id ? (
                        <Spin size="small" />
                      ) : (
                        <>
                          <FaTrashRestore /> Khôi phục
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleHardDelete(p._id)}
                      className="btn btn-sm btn-outline-danger"
                      disabled={processingId === p._id}
                    >
                      {processingId === p._id ? (
                        <Spin size="small" />
                      ) : (
                        <>
                          <FaTrashAlt /> Xóa vĩnh viễn
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTrashPage;
