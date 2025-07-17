const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  const { productId, color, size, quantity } = item;

  // Nếu không có productId (null), thì không render
  if (!productId) return null;

  const { name, price, images } = productId;

  const formatCurrency = (num) =>
    num.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <tr>
      {/* Cột: Thông tin sản phẩm */}
      <td>
        <div className="d-flex align-items-center gap-4">
          <img
            src={images?.[0]}
            alt={name}
            className="rounded border"
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
                <FiTrash2 className="me-1" /> Xóa
              </button>
            </div>
          </div>
        </div>
      </td>

      {/* Cột: Đơn giá */}
      <td className="text-primary fw-medium">{formatCurrency(price)}</td>

      {/* Cột: Số lượng */}
      <td>
        <div className="btn-group" role="group">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onDecrease(item)}
            disabled={quantity <= 1}
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
        {formatCurrency(price * quantity)}
      </td>
    </tr>
  );
};
