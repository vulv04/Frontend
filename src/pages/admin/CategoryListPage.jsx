import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory, getCategories } from "../../api/category";
import { message } from "antd";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh mục:", err);
      toast.error("Không thể tải danh mục");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá danh mục này?")) return;
    try {
      await deleteCategory(id);
      message.success("Đã xoá danh mục thành công");
      fetchCategories();
    } catch (err) {
      message.error("Lỗi khi xoá danh mục");
    }
  };

  const toggleActive = async (category) => {
    try {
      const updated = { ...category, isActive: !category.isActive };
      await fetch(`/api/categories/${category._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      fetchCategories();
    } catch (err) {
      message.error("Không thể cập nhật trạng thái danh mục");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Danh mục sản phẩm</h2>
        <Link to="/admin/categories/add" className="btn btn-primary">
          Thêm danh mục
        </Link>
      </div>

      {categories.length === 0 ? (
        <p>Chưa có danh mục nào.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Logo</th>
                <th>Slug</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.title}</td>
                  <td>
                    {cat.logoUrl && (
                      <img
                        src={cat.logoUrl}
                        alt={cat.title}
                        style={{ height: "40px" }}
                      />
                    )}
                  </td>
                  <td>{cat.slug}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        cat.isActive ? "btn-success" : "btn-secondary"
                      }`}
                      onClick={() => toggleActive(cat)}
                    >
                      {cat.isActive ? "Hiện" : "Ẩn"}
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/admin/categories/edit/${cat._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
