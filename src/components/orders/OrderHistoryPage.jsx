import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";
import { message, Spin, Tag } from "antd";
import dayjs from "dayjs";

const statusColorMap = {
  pending: "default",
  processing: "blue",
  shipping: "orange",
  completed: "green",
  cancelled: "red",
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyOrders();
      setOrders(res.data?.data || []);
    } catch (err) {
      message.error("Không thể tải lịch sử đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🛒 Lịch sử đơn hàng của bạn</h2>

      {loading ? (
        <Spin />
      ) : orders.length === 0 ? (
        <p>❗Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Sản phẩm</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.code || order._id.slice(-6).toUpperCase()}</td>
                  <td>{dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td>
                    <Tag color={statusColorMap[order.status] || "default"}>
                      {order.status}
                    </Tag>
                  </td>
                  <td>{order.totalPrice.toLocaleString()}₫</td>
                  <td>
                    {order.items?.map((item, idx) => (
                      <div key={idx}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
