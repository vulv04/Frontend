import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Popconfirm, message } from "antd";
import { getBrandsTrash, restoreBrand, deleteBrand } from "../../api/brandApi";

const BrandTrashPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrashedBrands = async () => {
    try {
      setLoading(true);
      const res = await getBrandsTrash();
      setBrands(res.data.brands || []);
    } catch (err) {
      message.error("Không thể tải danh sách đã xoá!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashedBrands();
  }, []);

  const handleRestore = async (id) => {
    try {
      await restoreBrand(id);
      message.success("Đã khôi phục thương hiệu");
      fetchTrashedBrands();
    } catch {
      message.error("Khôi phục thất bại");
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await deleteBrand(id);
      message.success("Đã xoá vĩnh viễn thương hiệu");
      fetchTrashedBrands();
    } catch {
      message.error("Xoá thất bại");
    }
  };

  const columns = [
    { title: "Tên thương hiệu", dataIndex: "name", key: "name" },
    {
      title: "Trạng thái",
      render: () => <Tag color="red">Đã xoá</Tag>,
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Khôi phục thương hiệu này?"
            onConfirm={() => handleRestore(record._id)}
          >
            <Button type="link">♻️ Khôi phục</Button>
          </Popconfirm>
          <Popconfirm
            title="Xoá vĩnh viễn thương hiệu này?"
            onConfirm={() => handleHardDelete(record._id)}
          >
            <Button type="link" danger>
              ❌ Xoá vĩnh viễn
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <h2>🗑️ Thương hiệu đã xoá</h2>
      <Table
        dataSource={brands}
        columns={columns}
        loading={loading}
        rowKey="_id"
        bordered
      />
    </div>
  );
};

export default BrandTrashPage;
