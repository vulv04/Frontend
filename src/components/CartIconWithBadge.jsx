import React from "react";
import { Badge } from "antd";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartIconWithBadge = () => {
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  return (
    <div style={{ cursor: "pointer", position: "relative" }}>
      <Badge count={totalQuantity} showZero offset={[-2, 2]}>
        <FiShoppingBag size={24} onClick={() => navigate("/cart")} />
      </Badge>
    </div>
  );
};

export default CartIconWithBadge;
