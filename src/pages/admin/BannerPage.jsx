import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanners, deleteBanner } from "../../api/bannerApi";
import { message } from "antd";

const BannerListPage = () => {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const res = await getBanners();
      setBanners(res.data);
    } catch (err) {
      message.error("Không tải được danh sách banner");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa banner này?")) {
      try {
        await deleteBanner(id);
        message.success("Xóa banner thành công");
        fetchBanners();
      } catch (err) {
        message.error("Xóa thất bại");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách Banner</h2>
        <Link to="/admin/banners/add" className="btn btn-primary">
          Thêm Banner
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Link</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id}>
              <td>{banner.title}</td>
              <td>
                <img src={banner.image} alt="banner" height="60" />
              </td>
              <td>{banner.link}</td>
              <td>
                <Link
                  to={`/admin/banners/edit/${banner._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Sửa
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(banner._id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerListPage;
