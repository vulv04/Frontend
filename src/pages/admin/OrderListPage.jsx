import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Select,
  message,
  Typography,
  Spin,
  Button,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";

const { Title } = Typography;
const { Option } = Select;

const statusOptions = [
  "pending",
  "processing",
  "shipping",
  "completed",
  "cancelled",
];

const statusColorMap = {
  pending: "default",
  processing: "blue",
  shipping: "orange",
  completed: "green",
  cancelled: "red",
};

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders({ status: filter });
      setOrders(res.data || []);
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
    const currentIdx = statusOptions.indexOf(currentStatus);
    const newIdx = statusOptions.indexOf(newStatus);
    if (newIdx < currentIdx) {
      return message.warning("Không thể chuyển về trạng thái trước!");
    }

    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      message.success("Đã cập nhật trạng thái");
      fetchOrders();
    } catch {
      message.error("Cập nhật trạng thái thất bại");
    }
    setUpdatingId(null);
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (code, record) =>
        code || record._id?.slice(-6)?.toUpperCase() || "N/A",
    },
    {
      title: "Khách hàng",
      dataIndex: ["shippingAddress", "fullName"],
      key: "customer",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const currentIdx = statusOptions.indexOf(status);
        return (
          <>
            <Select
              size="small"
              value={status}
              style={{ minWidth: 120 }}
              loading={updatingId === record._id}
              onChange={(val) => handleStatusChange(record._id, status, val)}
            >
              {statusOptions.map((s, idx) => (
                <Option key={s} value={s} disabled={idx < currentIdx}>
                  {s}
                </Option>
              ))}
            </Select>
            <br />
            <Tag color={statusColorMap[status]} className="mt-1">
              {status}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Thanh toán",
      key: "payment",
      render: (_, order) => (
        <>
          <Tag color={order.isPaid ? "green" : "orange"}>
            {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
          <br />
          <Tag color={order.paymentMethod === "PayOS" ? "purple" : "cyan"}>
            {order.paymentMethod || "COD"}
          </Tag>
        </>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price?.toLocaleString()}₫`,
    },
    {
      title: "Sản phẩm",
      dataIndex: "orderItems",
      key: "items",
      render: (items) =>
        items?.map((item, idx) => (
          <div key={idx}>
            {item.name} x {item.quantity}
          </div>
        )),
    },
    {
      title: "Giao hàng",
      key: "shipping",
      render: (_, order) => {
        const addr = order.shippingAddress || {};
        return (
          <>
            <div>
              <strong>Họ tên:</strong> {addr.fullName}
            </div>
            <div>
              <strong>SĐT:</strong> {addr.phone}
            </div>
            <div>
              <strong>Địa chỉ:</strong>{" "}
              {[addr.detail, addr.ward, addr.district, addr.province]
                .filter(Boolean)
                .join(", ")}
            </div>
            {addr.note && (
              <div>
                <strong>Ghi chú:</strong> {addr.note}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, order) => (
        <Button
          size="small"
          type="primary"
          onClick={() => navigate(`/admin/orders/${order._id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <Card>
        <Title level={3}>Quản lý đơn hàng</Title>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <span>Lọc theo trạng thái:</span>
          <Select
            placeholder="Tất cả"
            allowClear
            style={{ width: 200 }}
            value={filter || undefined}
            onChange={(val) => setFilter(val)}
          >
            {statusOptions.map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 6 }}
          />
        )}
      </Card>
    </div>
  );
};

export default OrderListPage;
