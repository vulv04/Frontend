// ✅ Đã chuyển giao diện sang Ant Design (antd), giữ nguyên logic cũ
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Select,
  Spin,
  Image,
  Tag,
  message,
  Popconfirm,
} from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProduct, getProducts } from "../../../api/productApi";

const { Option } = Select;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const limit = 5;

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      const data = res.data;
      const productList = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
        ? data.products
        : typeof data === "object" && data !== null
        ? Object.values(data)
        : [];

      setProducts(productList.filter((p) => !p.isDeleted));
    } catch {
      message.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xoá mềm sản phẩm này?");
    if (!confirm) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      message.success("Đã chuyển vào thùng rác!");
      await fetchData();
    } catch {
      message.error("Xoá mềm thất bại!");
    }
    setDeletingId(null);
  };

  const filtered = products.filter((p) =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const paginated = sorted.slice((page - 1) * limit, page * limit);

  const columns = [
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price?.toLocaleString()}₫`,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (imgs, record) => (
        <Image
          src={imgs?.[0] || "/no-image.jpg"}
          fallback="/no-image.jpg"
          width={60}
          height={60}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Biến thể",
      key: "variants",
      render: (_, record) =>
        record.variants?.length ? (
          <Table
            dataSource={record.variants.map((v, i) => ({ ...v, key: i }))}
            pagination={false}
            size="small"
            columns={[
              {
                title: "Màu",
                dataIndex: "color",
                render: (color) => (
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "1px solid #ccc",
                    }}
                  />
                ),
              },
              { title: "Size", dataIndex: "size" },
              { title: "Kho", dataIndex: "stock" },
            ]}
          />
        ) : (
          <Tag color="default">Không có</Tag>
        ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button
            size="small"
            onClick={() => navigate(`/admin/products/${record._id}`)}
          >
            👁️ Xem
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => navigate(`/admin/products/edit/${record._id}`)}
          >
            <FaEdit /> Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xoá mềm sản phẩm này không?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button size="small" danger loading={deletingId === record._id}>
              🗑️ Xoá mềm
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0 }}>Danh sách sản phẩm</h2>

        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/admin/products/trash">
            <Button danger icon={<FaTrash />}>
              Thùng rác
            </Button>
          </Link>
          <Link to="/admin/products/add">
            <Button type="primary">Thêm sản phẩm</Button>
          </Link>
        </div>
      </div>

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
          value={sortBy}
          onChange={(val) => setSortBy(val)}
          style={{ width: 150 }}
        >
          <Option value="title">Tên</Option>
          <Option value="price">Giá</Option>
          <Option value="createdAt">Ngày tạo</Option>
        </Select>
        <Select
          placeholder="Thứ tự"
          value={sortOrder}
          onChange={(val) => setSortOrder(val)}
          style={{ width: 120 }}
        >
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={paginated}
          rowKey="_id"
          pagination={false}
          bordered
        />
      )}

      <div className="text-center mt-4">
        <Button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          style={{ marginRight: 8 }}
        >
          ← Trước
        </Button>
        <span style={{ margin: "0 12px" }}>Trang {page}</span>
        <Button
          disabled={page * limit >= sorted.length}
          onClick={() => setPage((p) => p + 1)}
        >
          Sau →
        </Button>
      </div>
    </div>
  );
};

export default ProductListPage;
