import React, { useEffect, useState } from "react";
import { Table, Image, Button, Tag, message, Spin } from "antd";
import { getBrands } from "../../api/brandApi"; // API gọi từ backend
import { Link } from "react-router-dom";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await getBrands();
      console.log("✅ Dữ liệu từ API:", res.data);
      setBrands(res.data.brands || res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thương hiệu:", error);
      message.error("Không thể tải danh sách thương hiệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const columns = [
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <Image
          src={logo || "/no-image.jpg"}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
          fallback="/no-image.jpg"
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) =>
        active ? <Tag color="green">Hiển thị</Tag> : <Tag color="red">Ẩn</Tag>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="d-flex gap-2">
          <Button type="link">Sửa</Button>
          <Button type="link" danger>
            Xoá
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🏷️ Danh sách Thương hiệu</h2>
        <Link to="/admin/brands/add">
          <Button type="primary">+ Thêm thương hiệu</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={brands} columns={columns} rowKey="_id" bordered />
      )}
    </div>
  );
};

export default BrandsPage;
