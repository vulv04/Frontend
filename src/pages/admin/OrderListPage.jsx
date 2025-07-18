import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";
import { message, Select, Tag, Spin } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders({ status: filter });
      setOrders(res.data?.data || []);
    } catch (err) {
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      message.success("Đã cập nhật trạng thái");
      fetchOrders();
    } catch (err) {
      message.error("Cập nhật trạng thái thất bại");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">📦 Quản lý đơn hàng</h2>

      <div className="mb-3 d-flex align-items-center gap-2">
        <span>Lọc theo trạng thái:</span>
        <Select
          placeholder="Tất cả"
          allowClear
          style={{ width: 200 }}
          onChange={(val) => setFilter(val)}
          value={filter || undefined}
          options={statusOptions.map((s) => ({ label: s, value: s }))}
        />
      </div>

      {loading ? (
        <Spin />
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Sản phẩm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.code || order._id.slice(-6).toUpperCase()}</td>
                  <td>{order.user?.name || "N/A"}</td>
                  <td>{dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td>
                    <Select
                      value={order.status}
                      onChange={(val) => handleStatusChange(order._id, val)}
                      size="small"
                      style={{ minWidth: 120 }}
                      options={statusOptions.map((s) => ({
                        label: s,
                        value: s,
                      }))}
                    />
                    <Tag color={statusColorMap[order.status]} className="mt-1">
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
                      className="btn btn-sm btn-outline-info"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
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

export default OrderListPage;
