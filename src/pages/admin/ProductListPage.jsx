import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../api/productApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "antd";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(date));
  };

  const fetchData = async () => {
    try {
      const res = await getProducts();
      const data = res.data.products || res.data;
      setProducts(data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách sản phẩm");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      message.success("Xoá thành công!");
      fetchData();
    } catch (error) {
      message.error("Xoá thất bại!");
    }
  };

  const filtered = products
    .filter((p) =>
      (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => (priorityFilter ? p.priority === priorityFilter : true));

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;

    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "createdAt") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (sortBy === "priority") {
      const map = { low: 1, medium: 2, high: 3 };
      valA = map[valA];
      valB = map[valB];
    }

    return sortOrder === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  const totalPages = Math.ceil(sorted.length / limit);
  const paginated = sorted.slice((page - 1) * limit, page * limit);

  const statusLabels = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    shipping: "Đang giao",
    completed: "Hoàn thành",
    cancelled: "Đã huỷ",
  };

  const allowedTransitions = {
    pending: ["processing", "cancelled"],
    processing: ["shipping", "cancelled"],
    shipping: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };

  return (
    <div className="container py-4">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Danh sách sản phẩm</h2>
        <Link to="/admin/products/add" className="btn btn-primary">
          Thêm sản phẩm
        </Link>
      </div>

      {/* Tìm kiếm, lọc, sắp xếp */}
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Tìm theo tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Tất cả ưu tiên</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="">Sắp xếp theo</option>
            <option value="title">Title</option>
            <option value="createdAt">Created At</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              if (!sortBy) setSortBy("title");
            }}
            className="form-select"
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      {/* Bảng item */}
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Images</th>
            <th>Priority</th>
            <th>Completed</th>
            <th>Status</th>
            <th>Created At</th>
            <th style={{ minWidth: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>
                <img
                  src={item.images[0]}
                  className="img-thumbnail"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="variant"
                />
              </td>
              <td className="text-capitalize fw-semibold">{item.priority}</td>
              <td>
                <span
                  className={`badge me-2 ${
                    item.status === "completed"
                      ? "bg-success"
                      : item.status === "processing"
                      ? "bg-warning text-dark"
                      : item.status === "shipping"
                      ? "bg-info text-dark"
                      : item.status === "cancelled"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {statusLabels[item.status] || "Không xác định"}
                </span>
              </td>
              <td>
                <select
                  value=""
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    const allowed = allowedTransitions[item.status] || [];

                    if (!allowed.includes(newStatus)) {
                      toast.error(
                        "Không thể chuyển về trạng thái trước hoặc trạng thái không hợp lệ"
                      );
                      return;
                    }

                    updateProduct(item._id, { status: newStatus }).then(() => {
                      setProducts((prev) =>
                        prev.map((p) =>
                          p._id === item._id ? { ...p, status: newStatus } : p
                        )
                      );
                      toast.success("Cập nhật trạng thái thành công");
                    });
                  }}
                  className="form-select form-select-sm d-inline-block w-auto"
                >
                  <option value="">Chuyển trạng thái</option>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <option
                      key={key}
                      value={key}
                      disabled={
                        key === item.status ||
                        !(allowedTransitions[item.status] || []).includes(key)
                      }
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </td>
              <td>{formatDate(item.createdAt)}</td>
              <td>
                <button
                  onClick={() => navigate(`/admin/todos/edit/${item._id}`)}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => navigate(`/admin/todos/detail/${item._id}`)}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                Không có dữ liệu phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Trang trước
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
              Trang sau
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductListPage;
