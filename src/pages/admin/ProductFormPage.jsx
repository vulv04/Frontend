import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, updateProduct } from "../../api/productApi";
import { toast } from "react-toastify";
import axios from "axios";
import { message } from "antd";

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { variants: [] } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const isEdit = Boolean(id);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProduct(id, data);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await createProduct(data);
        message.success("Tạo sản phẩm thành công");
      }
      navigate("/admin/products");
    } catch (error) {
      message.error("Lỗi khi lưu sản phẩm");
    }
  };

  useEffect(() => {
    if (isEdit) {
      axios.get(`/api/products/${id}`).then((res) => {
        const product = res.data;
        Object.keys(product).forEach((key) => setValue(key, product[key]));
      });
    }
  }, [id, isEdit, setValue]);

  const categoryOptions = [
    "Áo thun",
    "Áo sơ mi",
    "Áo khoác",
    "Quần jeans",
    "Quần short",
    "Đầm/Váy",
    "Giày dép",
    "Phụ kiện",
  ];
  const [imageMode, setImageMode] = useState("url");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(urls);
    setValue("images", urls);
  };

  return (
    <div className="container">
      <h2 className="mb-4">{isEdit ? "Cập nhật" : "Thêm"} sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Tên sản phẩm không được để trống",
            })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            {...register("price", {
              required: "Giá là bắt buộc",
              min: { value: 0, message: "Giá không được âm" },
            })}
            onInput={(e) => e.target.value < 0 && (e.target.value = 0)}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            rows="4"
            {...register("description")}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh sản phẩm</label>
          <div className="d-flex gap-4 mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="imageMode"
                value="url"
                checked={imageMode === "url"}
                onChange={() => setImageMode("url")}
              />
              <label className="form-check-label">Dán URL ảnh</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="imageMode"
                value="file"
                checked={imageMode === "file"}
                onChange={() => setImageMode("file")}
              />
              <label className="form-check-label">Chọn từ máy</label>
            </div>
          </div>

          {imageMode === "url" ? (
            <input
              type="text"
              className="form-control"
              placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
              {...register("images")}
            />
          ) : (
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
              onChange={handleImageFiles}
            />
          )}

          {selectedFiles.length > 0 && (
            <div className="mt-2">
              {selectedFiles.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="preview"
                  style={{ height: "60px", marginRight: "8px" }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select className="form-control" {...register("category")}>
            <option value="">Chọn danh mục</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Giới tính</label>
          <select className="form-control" {...register("gender")}>
            <option value="">Không chọn</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            className={`form-control ${errors.slug ? "is-invalid" : ""}`}
            {...register("slug", { required: "Slug không được để trống" })}
          />
          {errors.slug && (
            <div className="invalid-feedback">{errors.slug.message}</div>
          )}
        </div>

        <hr className="my-4" />
        <h4>Biến thể sản phẩm</h4>

        {fields.map((item, index) => (
          <div key={item.id} className="border rounded p-3 mb-3">
            <div className="row g-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Màu"
                  {...register(`variants.${index}.color`, { required: true })}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Size"
                  {...register(`variants.${index}.size`, { required: true })}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className={`form-control ${
                    errors.variants?.[index]?.stock ? "is-invalid" : ""
                  }`}
                  placeholder="Tồn kho"
                  {...register(`variants.${index}.stock`, {
                    required: true,
                    min: {
                      value: 0,
                      message: "Tồn kho không được âm",
                    },
                  })}
                  onInput={(e) => e.target.value < 0 && (e.target.value = 0)}
                />
                {errors.variants?.[index]?.stock && (
                  <div className="invalid-feedback">
                    {errors.variants[index].stock.message}
                  </div>
                )}
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="SKU"
                  {...register(`variants.${index}.sku`)}
                />
              </div>
              <div className="col-md-2 text-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => remove(index)}
                >
                  Xoá
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => append({ color: "", size: "", stock: 0, sku: "" })}
          >
            ➕ Thêm biến thể
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Cập nhật" : "Thêm"} sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
