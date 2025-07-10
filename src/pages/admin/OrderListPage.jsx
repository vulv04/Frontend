import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, deleteOrder, updateOrder } from "../../api/orderApi";
import { message } from "antd";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.orders || res.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá đơn hàng này?")) return;

    try {
      await deleteOrder(id);
      message.success("Xoá thành công!");
      fetchOrders();
    } catch (error) {
      message.error("Xoá thất bại!");
    }
  };

  const filtered = orders
    .filter(
      (o) =>
        o._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((o) => (statusFilter ? o.status === statusFilter : true));

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

  const formatDate = (date) => new Date(date).toLocaleString("vi-VN");

  return (
    <div className="container py-4">
      <h2 className="mb-4">Danh sách đơn hàng</h2>

      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Tìm theo mã hoặc tên khách hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="">Sắp xếp theo</option>
            <option value="createdAt">Ngày tạo</option>
            <option value="total">Tổng tiền</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || "Ẩn danh"}</td>
              <td>{order.total.toLocaleString()}₫</td>
              <td>
                <span
                  className={`badge bg-${
                    order.status === "completed" ? "success" : "secondary"
                  }`}
                >
                  {statusLabels[order.status]}
                </span>
              </td>
              <td>{formatDate(order.createdAt)}</td>
              <td>
                <select
                  value=""
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    const allowed = allowedTransitions[order.status] || [];

                    if (!allowed.includes(newStatus)) {
                      return message.error("Trạng thái không hợp lệ");
                    }

                    updateOrder(order._id, { status: newStatus }).then(() => {
                      setOrders((prev) =>
                        prev.map((o) =>
                          o._id === order._id ? { ...o, status: newStatus } : o
                        )
                      );
                      message.success("Cập nhật trạng thái thành công");
                    });
                  }}
                  className="form-select form-select-sm"
                >
                  <option value="">Chuyển trạng thái</option>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <option
                      key={key}
                      value={key}
                      disabled={
                        key === order.status ||
                        !(allowedTransitions[order.status] || []).includes(key)
                      }
                    >
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="btn btn-sm btn-danger mt-1"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Trước
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
              Sau
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OrderListPage;
