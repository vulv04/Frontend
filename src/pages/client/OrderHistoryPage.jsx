import React, { useEffect, useState } from "react";
import { Table, Tag, message, Spin, Empty, Button, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { getAllOrders, cancelOrder } from "../../api/orderApi";

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

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      message.warning("Vui lòng nhập lý do hủy đơn hàng.");
      return;
    }

    try {
      const res = await cancelOrder(selectedOrderId, { reason: cancelReason });
      console.log(res);
      message.success("Đã hủy đơn hàng thành công.");
      fetchOrders(); // refresh lại danh sách
      setCancelModalVisible(false);
      setCancelReason("");
      setSelectedOrderId(null);
    } catch (err) {
      message.error(err.response?.data?.message || "Hủy đơn hàng thất bại.");
    }
  };

  const showCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelModalVisible(true);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      render: (id) => <strong>{id.slice(-6).toUpperCase()}</strong>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "items",
      render: (items) => (
        <div>
          {items?.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <img
                src={
                  item.productId?.thumbnail ||
                  item.productId?.images?.[0] ||
                  "https://via.placeholder.com/40"
                }
                alt={item.productId?.title || "Ảnh sản phẩm"}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <div>
                <div>
                  <strong>{item.productId?.title || "Không xác định"}</strong>
                </div>
                <div>
                  Màu: {item.color || "N/A"} - Size: {item.size || "N/A"} - SL:{" "}
                  {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (total) => <span>{total?.toLocaleString("vi-VN")}₫</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "default";
        if (status === "pending") color = "orange";
        else if (status === "completed") color = "green";
        else if (status === "cancelled") color = "red";

        return <Tag color={color}>{status?.toUpperCase() || "N/A"}</Tag>;
      },
    },
    {
      title: "Hành động",
      render: (_, order) => (
        <div>
          <Link to={`/orders/${order._id}`}>
            <Button type="link">Xem chi tiết</Button>
          </Link>
          {order.status === "pending" && (
            <Button
              danger
              type="link"
              onClick={() => showCancelModal(order._id)}
            >
              Hủy đơn
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
      <h1>Lịch sử đơn hàng</h1>

      {loading ? (
        <Spin tip="Đang tải..." />
      ) : orders.length === 0 ? (
        <Empty description="Chưa có đơn hàng nào" />
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      )}

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
