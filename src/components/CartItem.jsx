import React from "react";
import { FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  const { name, image, color, size, price, quantity } = item;

  return (
    <tr>
      {/* Cột: Thông tin sản phẩm */}
      <td>
        <div className="d-flex align-items-center gap-3">
          <img
            src={image}
            alt={name}
            className="rounded"
            style={{ width: 80, height: 80, objectFit: "cover" }}
          />
          <div>
            <div className="fw-semibold">{name}</div>
            <div className="text-muted small">
              {color && <>Màu: {color} </>}
              {size && <>| Size: {size}</>}
            </div>
            <div className="mt-1">
              <button
                className="btn btn-sm btn-link text-danger p-0"
                onClick={() => onRemove(item)}
              >
                <FiTrash2 /> Xóa
              </button>
            </div>
          </div>
        </div>
      </td>

      {/* Cột: Đơn giá */}
      <td className="text-primary fw-medium">{price.toLocaleString()}đ</td>

      {/* Cột: Số lượng */}
      <td>
        <div className="btn-group" role="group">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onDecrease(item)}
          >
            −
          </button>
          <span className="btn btn-light btn-sm disabled">{quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onIncrease(item)}
          >
            +
          </button>
        </div>
      </td>

      {/* Cột: Thành tiền */}
      <td className="fw-bold text-danger">
        {(price * quantity).toLocaleString()}đ
      </td>
    </tr>
  );
};

export default CartItem;
