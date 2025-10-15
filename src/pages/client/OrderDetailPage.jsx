import React, { useEffect, useState } from "react";
import {
  Descriptions,
  Tag,
  Button,
  Spin,
  message,
  Modal,
  Card,
  Space,
  Divider,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, cancelOrder } from "../../api/orderApi";

const statusColors = {
  pending: "orange",
  confirmed: "blue",
  shipping: "purple",
  completed: "green",
  canceled: "red",
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data?.data || res.data);
      } catch (error) {
        message.error("Không thể tải chi tiết đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    Modal.confirm({
      title: "Xác nhận huỷ đơn hàng",
      content: "Bạn có chắc muốn huỷ đơn hàng này không?",
      okText: "Đồng ý",
      cancelText: "Không",
      onOk: async () => {
        try {
          setCancelling(true);
          await cancelOrder(id);
          message.success("Đã huỷ đơn hàng thành công");
          navigate("/orders");
        } catch (error) {
          message.error("Không thể huỷ đơn hàng");
        } finally {
          setCancelling(false);
        }
      },
    });
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" tip="Đang tải chi tiết đơn hàng..." />
      </div>
    );

  if (!order)
    return <div style={{ textAlign: "center" }}>Không tìm thấy đơn hàng</div>;

  const canCancel = ["pending", "confirmed"].includes(order.status);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <Card bordered>
        <h2 style={{ marginBottom: 16 }}>
          Chi tiết đơn hàng #{order._id.slice(-6).toUpperCase()}
        </h2>

        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Ngày đặt">
            {new Date(order.createdAt).toLocaleString("vi-VN")}
          </Descriptions.Item>
          <Descriptions.Item label="Tên người nhận">
            {order.shippingAddress?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {order.shippingAddress?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ giao hàng">
            {order.shippingAddress?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú">
            {order.shippingAddress?.note || "Không có"}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {order.paymentMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={statusColors[order.status] || "default"}>
              {order.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <h3 style={{ marginBottom: 16 }}>Danh sách sản phẩm</h3>
        <Space direction="vertical" style={{ width: "100%" }}>
          {order.orderItems.map((item, index) => (
            <Card key={index} size="small">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ color: "#888" }}>
                    Màu: {item.color} - Size: {item.size} - SL: {item.quantity}
                  </div>
                </div>
                <div style={{ fontWeight: 500 }}>
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </div>
              </div>
            </Card>
          ))}
        </Space>

        <Divider />

        <h3 style={{ textAlign: "right" }}>
          Tổng tiền:{" "}
          <span style={{ color: "red", fontSize: 18 }}>
            {order.totalPrice.toLocaleString("vi-VN")}₫
          </span>
        </h3>

        {canCancel && (
          <Button
            danger
            type="primary"
            onClick={handleCancelOrder}
            loading={cancelling}
            style={{ marginTop: 16 }}
          >
            Huỷ đơn hàng
          </Button>
        )}
      </Card>
    </div>
  );
};

export default OrderDetailPage;
