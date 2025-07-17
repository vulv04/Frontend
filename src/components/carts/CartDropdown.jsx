import React from "react";
import { Popover, Badge, List, Button, Divider } from "antd";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

const CartDropdown = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleRemoveItem = (productId, color, size) => {
    removeFromCart(productId, color, size);
  };

  const handleChangeQuantity = (type, productId, color, size, quantity) => {
    if (type === "decrease" && quantity <= 1) return;
    const newQuantity = type === "increase" ? quantity + 1 : quantity - 1;
    updateCartQuantity(productId, color, size, newQuantity);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productId?.price * item.quantity,
    0
  );

  const content = (
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
              <List.Item
                style={{ padding: "8px 0" }}
                actions={[
                  <DeleteOutlined
                    key="delete"
                    style={{ color: "red" }}
                    onClick={() =>
                      handleRemoveItem(
                        item.productId._id,
                        item.color,
                        item.size
                      )
                    }
                  />,
                ]}
              >
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
                    <div style={{ fontWeight: 500 }}>
                      {item.productId?.name}
                    </div>
                  }
                  description={
                    <>
                      <div style={{ fontSize: 13, color: "#666" }}>
                        Màu: {item.color}, Size: {item.size}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 6,
                        }}
                      >
                        <Button
                          icon={<MinusOutlined />}
                          size="small"
                          onClick={() =>
                            handleChangeQuantity(
                              "decrease",
                              item.productId._id,
                              item.color,
                              item.size,
                              item.quantity
                            )
                          }
                        />
                        <span style={{ margin: "0 8px", minWidth: 20 }}>
                          {item.quantity}
                        </span>
                        <Button
                          icon={<PlusOutlined />}
                          size="small"
                          onClick={() =>
                            handleChangeQuantity(
                              "increase",
                              item.productId._id,
                              item.color,
                              item.size,
                              item.quantity
                            )
                          }
                        />
                        <span style={{ marginLeft: 10, color: "#555" }}>
                          x {item.productId?.price.toLocaleString()}₫
                        </span>
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />

          <Divider style={{ margin: "12px 0" }} />

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
    <Popover content={content} trigger="hover" placement="bottomRight">
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
    </Popover>
  );
};

export default CartDropdown;
