import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Typography,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllNews, deleteNews } from "../../../api/newsApi";
import dayjs from "dayjs";

const { Title } = Typography;

const NewListPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await getAllNews();
      setNewsList(res?.data || []);
    } catch (error) {
      message.error("Lỗi khi tải danh sách tin tức");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      message.success("Xoá tin tức thành công");
      fetchNews();
    } catch (error) {
      message.error("Xoá tin tức thất bại");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (url) =>
        url ? (
          <Image
            src={url}
            alt="Ảnh"
            width={60}
            height={40}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <span style={{ color: "#888" }}>Không có</span>
        ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Trạng thái",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (val) =>
        val ? (
          <span style={{ color: "green" }}>Đã xuất bản</span>
        ) : (
          <span style={{ color: "red" }}>Nháp</span>
        ),
    },
    {
      title: "Ngày xuất bản",
      dataIndex: "publishedAt",
      key: "publishedAt",
      render: (date) =>
        date ? (
          <span>{dayjs(date).format("DD/MM/YYYY HH:mm")}</span>
        ) : (
          <span style={{ color: "#999" }}>Chưa xuất bản</span>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/news/edit/${record._id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá tin này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xoá"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Space>
          <Title level={3} style={{ margin: 0 }}>
            Danh sách tin tức
          </Title>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/news/add")}
        >
          Thêm tin tức
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={newsList}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default NewListPage;
