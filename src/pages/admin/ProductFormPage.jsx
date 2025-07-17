import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../api/productApi";
import { getVariants, createVariant } from "../../api/variantApi";
import { getCategories } from "../../api/category";
import { message, Select } from "antd";

const ProductFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { images: [], variants: [], category: "" } });

  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newVariant, setNewVariant] = useState({
    color: "",
    sizes: "",
    stock: "",
  });
  const [imageMode, setImageMode] = useState("url");
  const [imageFiles, setImageFiles] = useState([]);
  const selectedVariants = watch("variants");

  const fetchVariants = async () => {
    try {
      const res = await getVariants();
      setVariants(res.data.variants || res.data);
    } catch {
      message.error("Lỗi khi tải biến thể");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      const rawCategories = Array.isArray(res.data)
        ? res.data
        : res.data.categories || res.data.data || [];
      const formatted = (rawCategories || []).map((cat) => ({
        label: cat.title,
        value: cat.title,
      }));
      setCategories(formatted);
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tải danh mục");
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dx1r7axdz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok || !data.secure_url) {
        throw new Error(data.error?.message || "Upload failed");
      }
      return data.secure_url;
    } catch (err) {
      message.error(`Upload ảnh thất bại: ${err.message}`);
      throw err;
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      const product = res.data;

      if (Array.isArray(product.images)) {
        setValue("images", product.images.join(", "));
      }

      setValue(
        "variants",
        product.variants.map((v) => (typeof v === "string" ? v : v._id))
      );
      reset(product);
    } catch {
      message.error("Không thể tải sản phẩm");
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchCategories();
    if (isEdit) fetchProduct();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (typeof data.images === "string") {
        data.images = data.images
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean);
      }

      if (imageFiles.length > 0) {
        const uploaded = await Promise.all(
          imageFiles.map((file) => uploadToCloudinary(file))
        );
        data.images = [...data.images, ...uploaded];
      }

      data.variants = selectedVariants.map((v) =>
        typeof v === "string" ? v : v._id
      );

      if (isEdit) {
        await updateProduct(id, data);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await createProduct(data);
        message.success("Tạo sản phẩm thành công");
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi lưu sản phẩm");
    }
  };

  const handleAddVariant = async () => {
    if (selectedVariants.length > 0) {
      return message.warning("Bạn đã chọn biến thể, không cần nhập mới.");
    }

    const { color, sizes, stock } = newVariant;
    if (!color || !sizes || !stock) {
      return message.warning("Vui lòng điền đủ thông tin biến thể");
    }

    const sizeList = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      for (const size of sizeList) {
        await createVariant({ color, size, stock });
      }
      message.success("Tạo biến thể thành công");
      await fetchVariants();
      setNewVariant({ color: "", sizes: "", stock: "" });
    } catch {
      message.error("Tạo biến thể thất bại");
    }
  };

  return (
    <div className="container py-4">
      <h2>{isEdit ? "Cập nhật" : "Thêm"} sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Tên sản phẩm</label>
          <input
            className="form-control"
            {...register("title", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label>Slug</label>
          <input
            className="form-control"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label>Giá</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label>Ảnh sản phẩm</label>
          <Select
            defaultValue={imageMode}
            onChange={setImageMode}
            style={{ width: 150, marginBottom: 10 }}
            options={[
              { label: "URL", value: "url" },
              { label: "File", value: "file" },
            ]}
          />
          {imageMode === "url" ? (
            <input
              className="form-control"
              placeholder="URLs cách nhau bởi dấu phẩy"
              {...register("images")}
            />
          ) : (
            <input
              type="file"
              className="form-control"
              multiple
              accept="image/*"
              onChange={(e) => setImageFiles([...e.target.files])}
            />
          )}
        </div>

        <div className="mb-3">
          <label>Danh mục</label>
          <Select
            style={{ width: "100%" }}
            options={categories}
            value={watch("category")}
            onChange={(val) => setValue("category", val)}
          />
        </div>

        <div className="mb-3">
          <label>Chọn biến thể</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            value={selectedVariants}
            onChange={(value) => setValue("variants", value)}
            options={variants.map((variant) => ({
              label: `${variant.color} - ${variant.size} (Tồn: ${variant.stock})`,
              value: variant._id,
            }))}
          />
        </div>

        {selectedVariants.length === 0 && (
          <div className="mb-3 border-top pt-3">
            <h5>+ Thêm biến thể mới</h5>
            <div className="row g-2">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Màu sắc"
                  className="form-control"
                  value={newVariant.color}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, color: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Kích thước (cách nhau bởi dấu phẩy)"
                  className="form-control"
                  value={newVariant.sizes}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, sizes: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  placeholder="Tồn kho"
                  className="form-control"
                  value={newVariant.stock}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, stock: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-outline-success w-100"
                  onClick={handleAddVariant}
                >
                  Tạo biến thể
                </button>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Cập nhật" : "Thêm"} sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
