import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../api/productApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const limit = 5;

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getProducts();
      const data = res.data.products || res.data;
      setProducts(data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sản phẩm");
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
      toast.success("Xoá thành công!");
      fetchData();
    } catch (error) {
      toast.error("Xoá thất bại!");
    }
  };

  const handleToggleCompleted = async (product) => {
    try {
      if (!product || !product._id) {
        console.error("Product ID is missing:", product);
        return;
      }

      const updatedProduct = {
        ...product,
        completed: !product.completed,
      };

      const response = await updateProduct(product._id, updatedProduct);
      console.log("Update success:", response.data);
      toast.success("Cập nhật thành công");
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Không thể cập nhật sản phẩm");
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

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="mb-4">Danh sách Todo</h2>

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

      {/* Bảng todo */}
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Completed</th>
            <th style={{ minWidth: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td className={`text-capitalize fw-semibold`}>{todo.priority}</td>
              <td>
                {todo.completed ? (
                  <span className="badge bg-success">Hoàn Thành</span>
                ) : (
                  <span className="badge bg-warning text-dark">
                    Chưa hoàn thành
                  </span>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleToggleCompleted(todo)}
                  className="btn btn-sm btn-outline-success me-2"
                >
                  {todo.completed ? "Bỏ hoàn thành" : "Hoàn thành"}
                </button>
                <button
                  onClick={() => navigate(`/admin/todos/edit/${todo._id}`)}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => navigate(`/admin/todos/detail/${todo._id}`)}
                  className="btn btn-sm btn-outline-secondary me-2"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
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
