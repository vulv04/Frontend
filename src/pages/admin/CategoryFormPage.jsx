import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  updateCategory,
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

  // Nếu có id thì là chế độ chỉnh sửa
  useEffect(() => {
    if (id) {
      getCategoryById(id)
        .then((res) => {
          const data = res.data;
          Object.keys(data).forEach((key) => setValue(key, data[key]));
        })
        .catch(() => message.error("Không tải được danh mục"));
    }
  }, [id, setValue]);

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

  return (
    <div className="container mt-4">
      <h2>{id ? "Chỉnh sửa" : "Thêm"} danh mục</h2>
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
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select className="form-select" {...register("isActive")}>
            <option value={true}>Hiện</option>
            <option value={false}>Ẩn</option>
          </select>
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

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("isActive")}
          />
          <label className="form-check-label">Hiển thị danh mục</label>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>
    </div>
  );
};

export default CategoryFormPage;
