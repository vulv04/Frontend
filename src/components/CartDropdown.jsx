import React from "react";
import { Dropdown, Badge, List, Button, Divider } from "antd";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartDropdown = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // 👉 Tính tổng tiền
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productId?.price * item.quantity,
    0
  );

  const overlayContent = (
    <div
      style={{
        width: 320,
        maxHeight: 500,
        overflowY: "auto",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: 12,
      }}
    >
      {cartItems.length === 0 ? (
        <div className="text-center p-4">
          <FiShoppingBag size={32} style={{ color: "#bbb" }} />
          <p className="mt-2 mb-0 text-muted">Giỏ hàng trống</p>
        </div>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item style={{ padding: "8px 0" }}>
                <List.Item.Meta
                  avatar={
                    <img
                      src={
                        item.productId?.thumbnail || item.productId?.image || ""
                      }
                      alt="Ảnh sản phẩm"
                      width={50}
                      height={50}
                      style={{
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #eee",
                      }}
                    />
                  }
                  title={
                    <span style={{ fontWeight: 500 }}>
                      {item.productId?.name}
                    </span>
                  }
                  description={
                    <div style={{ fontSize: 13, color: "#666" }}>
                      SL: {item.quantity} <br />
                      Màu: {item.color}, Size: {item.size}
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          <Divider style={{ margin: "12px 0" }} />

          {/* ✅ Tổng tiền */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Tổng cộng:</strong>
            <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
              {totalAmount.toLocaleString()}₫
            </span>
          </div>

          <Button type="primary" block onClick={handleCheckout}>
            Thanh toán
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Dropdown
      overlay={overlayContent}
      trigger={["hover"]}
      placement="bottomRight"
      arrow
    >
      <div style={{ cursor: "pointer", position: "relative" }}>
        <Badge
          count={cartItems.length}
          color="#1890ff"
          showZero
          offset={[0, 0]}
        >
          <FiShoppingBag size={24} color="#333" />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default CartDropdown;
