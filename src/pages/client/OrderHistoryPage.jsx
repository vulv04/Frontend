import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  message,
  Spin,
  Empty,
  Button,
  Modal,
  Input,
  Card,
  Typography,
  Space,
  Divider,
} from "antd";
import { Link } from "react-router-dom";
import { getAllOrders, cancelOrder } from "../../api/orderApi";
import {
  FileTextOutlined,
  ShoppingOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      const ordersData = res.data?.success ? res.data.data : res.data || [];
      setOrders(ordersData);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Lỗi khi tải lịch sử đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelModalVisible(true);
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      message.warning("Vui lòng nhập lý do hủy đơn hàng.");
      return;
    }

    try {
      await cancelOrder(selectedOrderId, { reason: cancelReason });
      message.success("Đã hủy đơn hàng thành công.");
      fetchOrders();
      setCancelModalVisible(false);
      setCancelReason("");
      setSelectedOrderId(null);
    } catch (err) {
      message.error(err.response?.data?.message || "Hủy đơn hàng thất bại.");
    }
  };

  const renderStatusTag = (status) => {
    const map = {
      pending: { color: "orange", label: "Chờ xác nhận" },
      processing: { color: "blue", label: "Đang xử lý" },
      shipping: { color: "geekblue", label: "Đang giao hàng" },
      completed: { color: "green", label: "Hoàn thành" },
      cancelled: { color: "red", label: "Đã hủy" },
    };
    const { color, label } = map[status] || {
      color: "default",
      label: "Không xác định",
    };
    return <Tag color={color}>{label}</Tag>;
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      render: (id) => (
        <Text strong style={{ color: "#1677ff" }}>
          #{id.slice(-6).toUpperCase()}
        </Text>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (date) => <Text>{new Date(date).toLocaleString("vi-VN")}</Text>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "items",
      render: (items) => (
        <div>
          {items?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <img
                src={
                  item.productId?.thumbnail ||
                  item.productId?.images?.[0] ||
                  "https://via.placeholder.com/40"
                }
                alt={item.productId?.title || "Ảnh sản phẩm"}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 8,
                  objectFit: "cover",
                  border: "1px solid #f0f0f0",
                }}
              />
              <div>
                <Text strong>{item.productId?.title || "Không xác định"}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Màu: {item.color || "N/A"} | Size: {item.size || "N/A"} | SL:{" "}
                  {item.quantity}
                </Text>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (total) => <Text strong>{total?.toLocaleString("vi-VN")} ₫</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: renderStatusTag,
    },
    {
      title: "Hành động",
      render: (_, order) => (
        <Space>
          <Link to={`/orders/${order._id}`}>
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              size="small"
              style={{ borderRadius: 6 }}
            >
              Chi tiết
            </Button>
          </Link>
          {order.status === "pending" && (
            <Button
              danger
              type="default"
              icon={<StopOutlined />}
              size="small"
              onClick={() => showCancelModal(order._id)}
              style={{ borderRadius: 6 }}
            >
              Hủy đơn
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      <Card
        title={
          <Space>
            <ShoppingOutlined style={{ color: "#1677ff" }} />
            <Title level={4} style={{ margin: 0 }}>
              Lịch sử đơn hàng
            </Title>
          </Space>
        }
        bordered={false}
        className="shadow-md"
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <Divider style={{ margin: "12px 0 24px 0" }} />

        {loading ? (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Spin size="large" tip="Đang tải đơn hàng..." />
          </div>
        ) : orders.length === 0 ? (
          <Empty description="Chưa có đơn hàng nào" />
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            pagination={{ pageSize: 5, showSizeChanger: false }}
            scroll={{ x: true }}
          />
        )}
      </Card>

      <Modal
        title="Hủy đơn hàng"
        open={cancelModalVisible}
        onOk={handleCancelOrder}
        onCancel={() => setCancelModalVisible(false)}
        okText="Xác nhận hủy"
        cancelText="Đóng"
      >
        <p>Vui lòng nhập lý do bạn muốn hủy đơn hàng:</p>
        <Input.TextArea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          rows={4}
          placeholder="Ví dụ: Tôi đặt nhầm, sản phẩm không đúng ý,..."
        />
      </Modal>
    </div>
  );
};

export default OrderHistoryPage;
