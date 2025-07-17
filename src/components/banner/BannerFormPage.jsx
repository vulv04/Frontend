// src/pages/admin/BannerFormPage.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createBanner, getBannerById, updateBanner } from "../../api/bannerApi";
import { message } from "antd";

const BannerFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Load dữ liệu cũ
  useEffect(() => {
    if (id) {
      getBannerById(id).then((res) => {
        const banner = res.data;
        setValue("title", banner.title);
        setValue("link", banner.link);
        setValue("image", banner.image);
        setImagePreview(banner.image);
      });
    }
  }, [id]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset"); // thay bằng preset của bạn

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx1r7axdz/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = data.image;

      // Nếu là file mới
      if (data.image[0] instanceof File) {
        imageUrl = await uploadImageToCloudinary(data.image[0]);
      }

      const bannerPayload = {
        title: data.title,
        link: data.link,
        image: imageUrl,
      };

      if (id) {
        await updateBanner(id, bannerPayload);
        message.success("Cập nhật banner thành công");
      } else {
        await createBanner(bannerPayload);
        message.success("Thêm banner thành công");
      }
      navigate("/admin/banners");
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi lưu banner");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Sửa" : "Thêm"} Banner</h2>

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
          <label className="form-label">Link</label>
          <input className="form-control" {...register("link")} />
        </div>

        <div className="mb-3">
          <label className="form-label">Hình ảnh</label>
          <input
            type="file"
            className="form-control"
            {...register("image", { required: !id })}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ height: 120, marginTop: 10 }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>
    </div>
  );
};

export default BannerFormPage;
