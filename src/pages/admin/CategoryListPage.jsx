import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Image,
  Space,
  Tag,
  Popconfirm,
  message,
  Card,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
  softDeleteCategory,
  restoreCategory,
  updateCategory,
} from "../../api/category";

const { TabPane } = Tabs;

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("active"); // "active" | "trash"
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (err) {
      message.error("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSoftDelete = async (id) => {
    try {
      await softDeleteCategory(id);
      message.success("Đã chuyển danh mục vào thùng rác");
      fetchCategories();
    } catch {
      message.error("Lỗi khi xóa mềm danh mục");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success("Đã xóa danh mục vĩnh viễn");
      fetchCategories();
    } catch {
      message.error("Lỗi khi xóa danh mục");
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreCategory(id);
      message.success("Đã khôi phục danh mục");
      fetchCategories();
    } catch {
      message.error("Lỗi khi khôi phục danh mục");
    }
  };

  const toggleActive = async (category) => {
    try {
      const updated = { isActive: !category.isActive };
      await updateCategory(category._id, updated);
      message.success("Đã cập nhật trạng thái danh mục");
      fetchCategories();
    } catch {
      message.error("Không thể cập nhật trạng thái danh mục");
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logoUrl",
      align: "center",
      render: (logoUrl) =>
        logoUrl ? (
          <Image
            src={logoUrl}
            alt="logo"
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        ) : (
          <Tag color="default">Không có</Tag>
        ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      ellipsis: true,
      render: (desc) => desc || <Tag color="default">Không có</Tag>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (_, record) =>
        !record.deletedAt ? (
          <Button
            size="small"
            type={record.isActive ? "primary" : "default"}
            icon={record.isActive ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => toggleActive(record)}
          >
            {record.isActive ? "Hiện" : "Ẩn"}
          </Button>
        ) : (
          <Tag color="red">Đã xóa</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          {!record.deletedAt ? (
            <>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => navigate(`/admin/categories/edit/${record._id}`)}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Xoá mềm danh mục này?"
                onConfirm={() => handleSoftDelete(record._id)}
              >
                <Button danger size="small" icon={<DeleteOutlined />}>
                  Xóa
                </Button>
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                type="dashed"
                size="small"
                icon={<RollbackOutlined />}
                onClick={() => handleRestore(record._id)}
              >
                Khôi phục
              </Button>
              <Popconfirm
                title="Xóa vĩnh viễn danh mục này?"
                onConfirm={() => handleDelete(record._id)}
              >
                <Button danger size="small">
                  Xóa vĩnh viễn
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Lọc dữ liệu theo tab
  const activeCategories = categories.filter((cat) => !cat.deletedAt);
  const trashCategories = categories.filter((cat) => cat.deletedAt);

  return (
    <Card
      title="Quản lý danh mục sản phẩm"
      extra={
        <Space>
          {activeTab === "active" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/admin/categories/add")}
            >
              Thêm danh mục
            </Button>
          )}
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchCategories}
            loading={loading}
          >
            Làm mới
          </Button>
        </Space>
      }
      className="shadow-md rounded-xl"
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "active",
            label: "Danh sách hoạt động",
            children: (
              <Table
                bordered
                rowKey="_id"
                columns={columns}
                dataSource={activeCategories}
                loading={loading}
                pagination={{ pageSize: 8 }}
              />
            ),
          },
          {
            key: "trash",
            label: "Thùng rác",
            children: (
              <Table
                bordered
                rowKey="_id"
                columns={columns}
                dataSource={trashCategories}
                loading={loading}
                pagination={{ pageSize: 8 }}
              />
            ),
          },
        ]}
      />
    </Card>
  );
};

export default CategoryListPage;
