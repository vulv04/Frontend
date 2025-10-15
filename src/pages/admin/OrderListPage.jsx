import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Select,
  message,
  Input,
  Button,
  Space,
  Spin,
} from "antd";
import {
  ReloadOutlined,
  EyeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";

const { Option } = Select;

// ✅ Danh sách trạng thái khớp với backend
const statusOptions = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "processing", label: "Đang xử lý" },
  { value: "delivering", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã giao hàng" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

// ✅ Màu trạng thái
const statusColorMap = {
  pending: "default",
  processing: "blue",
  delivering: "orange",
  delivered: "gold",
  completed: "green",
  cancelled: "red",
};

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders({ status: filter });
      const data = Array.isArray(res.data) ? res.data : [];
      setOrders(data);
    } catch (err) {
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const handleStatusChange = async (orderId, currentStatus, newStatus) => {
    // Ngăn quay lại trạng thái trước
    const orderFlow = [
      "pending",
      "processing",
      "delivering",
      "delivered",
      "completed",
      "cancelled",
    ];
    const currentIdx = orderFlow.indexOf(currentStatus);
    const newIdx = orderFlow.indexOf(newStatus);

    if (newIdx < currentIdx) {
      return message.warning("Không thể quay lại trạng thái trước đó!");
    }

    // Không cho thay đổi nếu đơn đã hủy hoặc hoàn thành
    if (["cancelled", "completed"].includes(currentStatus)) {
      return message.info("Đơn hàng này đã hoàn tất, không thể thay đổi.");
    }

    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      message.success("Cập nhật trạng thái thành công");
      fetchOrders();
    } catch (err) {
      message.error("Cập nhật trạng thái thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  // Lọc tìm kiếm (tên KH hoặc mã đơn)
  const filteredOrders = orders.filter(
    (o) =>
      (o.shippingAddress?.fullName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (String(o.orderCode) || o._id)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      render: (code, record) =>
        code || record._id?.slice(-6)?.toUpperCase() || "N/A",
    },
    {
      title: "Khách hàng",
      dataIndex: ["shippingAddress", "fullName"],
      render: (name, record) => (
        <>
          <strong>{name}</strong>
          <div>{record.shippingAddress?.phone}</div>
        </>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          <Select
            size="small"
            value={status}
            style={{ minWidth: 130 }}
            loading={updatingId === record._id}
            onChange={(val) => handleStatusChange(record._id, status, val)}
          >
            {statusOptions.map((opt) => (
              <Option
                key={opt.value}
                value={opt.value}
                disabled={
                  statusOptions.findIndex((s) => s.value === opt.value) <
                  statusOptions.findIndex((s) => s.value === status)
                }
              >
                {opt.label}
              </Option>
            ))}
          </Select>
          <Tag color={statusColorMap[status]}>
            {statusOptions.find((s) => s.value === status)?.label}
          </Tag>
        </div>
      ),
    },
    {
      title: "Thanh toán",
      render: (_, order) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <Tag color={order.isPaid ? "green" : "orange"}>
            {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
          <Tag color={order.paymentMethod === "PayOS" ? "purple" : "cyan"}>
            {order.paymentMethod === "PayOS" ? "PayOS" : "COD"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (price) => `${price?.toLocaleString()}₫`,
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          type="primary"
          onClick={() => navigate(`/admin/orders/${record._id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <ShoppingOutlined />
          <span>Quản lý đơn hàng</span>
        </Space>
      }
      extra={
        <Button
          icon={<ReloadOutlined />}
          onClick={fetchOrders}
          loading={loading}
        >
          Làm mới
        </Button>
      }
      className="shadow-md rounded-xl"
    >
      {/* Bộ lọc tìm kiếm */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <Input
          placeholder="Tìm theo tên khách hàng hoặc mã đơn"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 280 }}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          value={filter || undefined}
          onChange={(val) => setFilter(val)}
          allowClear
          style={{ width: 200 }}
        >
          {statusOptions.map((s) => (
            <Option key={s.value} value={s.value}>
              {s.label}
            </Option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          bordered
          rowKey="_id"
          columns={columns}
          dataSource={filteredOrders}
          pagination={{ pageSize: 8 }}
          scroll={{ x: true }}
        />
      )}
    </Card>
  );
};

export default OrderListPage;
