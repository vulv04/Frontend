import React, { useEffect, useState } from "react";
import { Descriptions, Tag, Button, Spin, message, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, cancelOrderById } from "../../api/orderApi";

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
      title: "Bạn có chắc muốn huỷ đơn hàng?",
      onOk: async () => {
        try {
          setCancelling(true);
          await cancelOrderById(id);
          message.success("Đã huỷ đơn hàng");
          navigate("/orders");
        } catch (error) {
          message.error("Không thể huỷ đơn hàng");
        } finally {
          setCancelling(false);
        }
      },
    });
  };

  if (loading) return <Spin tip="Đang tải chi tiết đơn hàng..." />;

  if (!order) return <div>Không tìm thấy đơn hàng</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px" }}>
      <h2>Chi tiết đơn hàng #{order._id.slice(-6).toUpperCase()}</h2>

      <Descriptions bordered column={1}>
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
          <Tag
            color={
              order.status === "pending"
                ? "orange"
                : order.status === "completed"
                ? "green"
                : "red"
            }
          >
            {order.status?.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          {order.totalPrice.toLocaleString("vi-VN")}₫
        </Descriptions.Item>
        <Descriptions.Item label="Danh sách sản phẩm">
          {order.orderItems.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                />
                <div>
                  <div>{item.name}</div>
                  <div>
                    Màu: {item.color} - Size: {item.size} - SL: {item.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>

      {order.status === "pending" && (
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
    </div>
  );
};

export default OrderDetailPage;
