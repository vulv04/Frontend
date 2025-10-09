import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Image,
  Tag,
  Space,
  Popconfirm,
  message,
  Card,
  Tabs,
  Input,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  RollbackOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../../api/productApi";

const { Option } = Select;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      const data = res.data;
      const productList = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
        ? data.products
        : typeof data === "object" && data !== null
        ? Object.values(data)
        : [];
      setProducts(productList);
    } catch {
      message.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSoftDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("Đã chuyển sản phẩm vào thùng rác!");
      fetchData();
    } catch {
      message.error("Xóa mềm thất bại!");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Không rõ";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Không rõ";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  };

  // Lọc dữ liệu
  const filtered = products.filter((p) =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp
  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === "createdAt") {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    return sortOrder === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  const activeProducts = sorted.filter((p) => !p.isDeleted);
  const trashProducts = sorted.filter((p) => p.isDeleted);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "images",
      align: "center",
      render: (imgs) =>
        imgs?.[0] ? (
          <Image
            src={imgs[0]}
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        ) : (
          <Tag color="default">Không có</Tag>
        ),
    },
    {
      title: "Tên",
      dataIndex: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => `${price?.toLocaleString()}₫`,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (cat) => cat || <Tag color="default">Không có</Tag>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      render: (brand) => brand || <Tag color="default">Không có</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          {!record.isDeleted ? (
            <>
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/admin/products/${record._id}`)}
              >
                Xem
              </Button>
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => navigate(`/admin/products/edit/${record._id}`)}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Chuyển sản phẩm vào thùng rác?"
                onConfirm={() => handleSoftDelete(record._id)}
              >
                <Button danger size="small" icon={<DeleteOutlined />}>
                  Xóa mềm
                </Button>
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                type="dashed"
                size="small"
                icon={<RollbackOutlined />}
                onClick={() => message.info("Khôi phục sản phẩm (demo)")}
              >
                Khôi phục
              </Button>
              <Popconfirm
                title="Xóa vĩnh viễn sản phẩm này?"
                onConfirm={() => message.info("Xóa vĩnh viễn (demo)")}
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

  return (
    <Card
      title="Quản lý sản phẩm"
      extra={
        <Space>
          {activeTab === "active" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/admin/products/add")}
            >
              Thêm sản phẩm
            </Button>
          )}
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            loading={loading}
          >
            Làm mới
          </Button>
        </Space>
      }
      className="shadow-md rounded-xl"
    >
      <div
        style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}
      >
        <Input
          placeholder="Tìm theo tên sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 250 }}
        />
        <Select
          placeholder="Sắp xếp theo"
          value={sortBy || undefined}
          onChange={(val) => setSortBy(val)}
          style={{ width: 150 }}
        >
          <Option value="title">Tên</Option>
          <Option value="price">Giá</Option>
          <Option value="createdAt">Ngày tạo</Option>
        </Select>
        <Select
          placeholder="Thứ tự"
          value={sortOrder || undefined}
          onChange={(val) => setSortOrder(val)}
          style={{ width: 150 }}
        >
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>
      </div>

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
                dataSource={activeProducts}
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
                dataSource={trashProducts}
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

export default ProductListPage;
