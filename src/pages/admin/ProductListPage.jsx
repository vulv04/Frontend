import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/productApi";
import { message, Spin } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const formatDate = (date) => {
    if (!date) return "Không rõ";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Không rõ";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      const data = res.data;
      const productList = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
        ? data.products
        : typeof data === "object" && data !== null
        ? Object.values(data)
        : [];

      // ✅ Chỉ hiển thị sản phẩm chưa bị xóa
      setProducts(productList.filter((p) => !p.isDeleted));
    } catch (err) {
      message.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa mềm sản phẩm này?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      message.success("Đã chuyển vào thùng rác!");
      await fetchData();
    } catch {
      message.error("Xóa mềm thất bại!");
    }
    setDeletingId(null);
  };

  const filtered = products.filter((p) =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === "createdAt") {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    return sortOrder === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  const totalPages = Math.ceil(sorted.length / limit);
  const paginated = sorted.slice((page - 1) * limit, page * limit);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Danh sách sản phẩm</h2>
        <div>
          <Link
            to="/admin/products/trash"
            className="btn btn-sm btn-outline-danger me-2"
          >
            <FaTrash />
          </Link>
          <Link to="/admin/products/add" className="btn btn-success">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="">Sắp xếp theo</option>
            <option value="title">Tên</option>
            <option value="price">Giá</option>
            <option value="createdAt">Ngày tạo</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : (
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Tên</th>
              <th>Slug</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Thương hiệu</th>
              <th>Ảnh</th>
              <th>Ngày tạo</th>
              <th>Biến thể</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.slug}</td>
                <td>{item.price?.toLocaleString()}₫</td>
                <td>{item.category || "-"}</td>
                <td>
                  <img
                    src={item.images?.[0] || "/no-image.jpg"}
                    onError={(e) => (e.target.src = "/no-image.jpg")}
                    className="img-thumbnail"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    alt={`Ảnh sản phẩm ${item.title}`}
                  />
                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.variants?.length || 0}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button
                      onClick={() => navigate(`/admin/products/${item._id}`)}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      👁️ Xem
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${item._id}`)
                      }
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-outline-danger"
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? (
                        <Spin size="small" />
                      ) : (
                        "🗑️ Xoá mềm"
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={9} className="text-muted text-center">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              ← Trước
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Trang {page} / {totalPages}
            </span>
          </li>
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Sau →
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductListPage;
