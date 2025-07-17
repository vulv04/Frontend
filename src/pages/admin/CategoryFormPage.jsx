import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../api/category";
import { message } from "antd";

const CategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Load dữ liệu khi có id (chế độ sửa)
  useEffect(() => {
    if (id) {
      getCategoryById(id)
        .then((res) => {
          const data = res.data?.data || res.data;
          Object.keys(data).forEach((key) => {
            if (key === "isActive") {
              setValue(key, Boolean(data[key]));
            } else {
              setValue(key, data[key]);
            }
          });
        })
        .catch(() => message.error("Không tải được danh mục"));
    }
  }, [id, setValue]);
  

  // Submit thêm hoặc cập nhật
  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCategory(id, data);
        message.success("Cập nhật danh mục thành công");
      } else {
        await createCategory(data);
        message.success("Thêm danh mục thành công");
      }
      navigate("/admin/categories");
    } catch (err) {
      message.error("Lỗi khi lưu danh mục");
    }
  };

  // Xử lý xóa danh mục
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xoá danh mục này?")) {
      try {
        await deleteCategory(id);
        message.success("Xoá danh mục thành công");
        navigate("/admin/categories");
      } catch (err) {
        message.error("Lỗi khi xoá danh mục");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{id ? "Chỉnh sửa" : "Thêm"} danh mục</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/categories")}
        >
          ← Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tiêu đề</label>
          <input
            className="form-control"
            {...register("title", { required: "Bắt buộc nhập tiêu đề" })}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("isActive")}
            id="isActive"
          />
          <label className="form-check-label" htmlFor="isActive">
            Hiển thị danh mục
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            className="form-control"
            {...register("slug", { required: "Bắt buộc nhập slug" })}
          />
          {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            {...register("description")}
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Logo URL</label>
          <input className="form-control" {...register("logoUrl")} />
        </div>

        <div className="mb-3">
          <label className="form-label">SEO Title</label>
          <input className="form-control" {...register("seoTitle")} />
        </div>

        <div className="mb-3">
          <label className="form-label">SEO Description</label>
          <textarea
            className="form-control"
            {...register("seoDescription")}
            rows="2"
          />
        </div>

        <div className="d-flex align-items-center">
          <button type="submit" className="btn btn-primary">
            {id ? "Cập nhật" : "Thêm mới"}
          </button>
          {id && (
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={handleDelete}
            >
              Xoá danh mục
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryFormPage;
