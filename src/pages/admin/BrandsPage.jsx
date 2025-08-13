import React, { useEffect, useState } from "react";
import { Table, Image, Button, Tag, message, Spin, Popconfirm } from "antd";
import {
  softDeleteBrand,
  deleteBrand,
  toggleBrandStatus,
  getAllBrands,
} from "../../api/brandApi";
import { Link } from "react-router-dom";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await getAllBrands();
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

  const handleSoftDelete = async (id) => {
    try {
      await softDeleteBrand(id);
      message.success("Đã ẩn thương hiệu");
      fetchBrands();
    } catch (error) {
      message.error("Ẩn thương hiệu thất bại");
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await deleteBrand(id);
      message.success("Đã xoá thương hiệu vĩnh viễn");
      fetchBrands();
    } catch (error) {
      message.error("Xoá thất bại");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleBrandStatus(id);
      message.success("Đã thay đổi trạng thái hiển thị");
      fetchBrands();
    } catch (err) {
      message.error("Lỗi khi thay đổi trạng thái");
    }
  };

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
        active ? (
          <Tag color="green">Hiển thị</Tag>
        ) : (
          <Tag color="red">Đã ẩn</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Link to={`/admin/brands/edit/${record._id}`}>
            <Button size="small">Sửa</Button>
          </Link>

          <Popconfirm
            title="Thay đổi trạng thái hiển thị?"
            onConfirm={() => handleToggleStatus(record._id)}
          >
            <Button size="small">{record.isActive ? "Ẩn" : "Hiển thị"}</Button>
          </Popconfirm>

          {!record.isDeleted && (
            <Popconfirm
              title="Bạn có chắc muốn ẩn thương hiệu này không?"
              onConfirm={() => handleSoftDelete(record._id)}
            >
              <Button size="small" danger type="default">
                Ẩn (xoá mềm)
              </Button>
            </Popconfirm>
          )}

          {record.isDeleted && (
            <Popconfirm
              title="Bạn có chắc muốn xoá vĩnh viễn thương hiệu này không?"
              onConfirm={() => handleHardDelete(record._id)}
            >
              <Button size="small" danger type="primary">
                Xoá vĩnh viễn
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ gap: 12, flexWrap: "wrap" }}
      >
        <h2>Danh sách Thương hiệu</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/admin/brands/trash">
            <Button danger>Thùng rác</Button>
          </Link>
          <Link to="/admin/brands/add">
            <Button type="primary">Thêm thương hiệu</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={brands}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 6 }}
        />
      )}
    </div>
  );
};

export default BrandsPage;
