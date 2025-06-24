import React, { useState } from "react";
import CartItem from "../../components/CartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      _id: "1",
      name: "Quần Short Nam Phối Dây Rút Họa Tiết In Form Relax",
      image:
        "https://product.hstatic.net/200000642007/product/1_67201e9fdc8d4c36b38087d69d3f3474_master.jpg",
      color: "Đen",
      size: "29",
      price: 420000,
      quantity: 1,
    },
  ]);
  const [showInvoice, setShowInvoice] = useState(false);

  const FREE_SHIP_THRESHOLD = 1500000;
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const isFreeShip = total >= FREE_SHIP_THRESHOLD;

  const handleIncrease = (item) => {
    const updated = cartItems.map((i) =>
      i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setCartItems(updated);
  };

  const handleDecrease = (item) => {
    const updated = cartItems.map((i) =>
      i._id === item._id && i.quantity > 1
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
    setCartItems(updated);
  };

  const handleRemove = (item) => {
    const updated = cartItems.filter((i) => i._id !== item._id);
    setCartItems(updated);
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">GIỎ HÀNG</h4>

      {/* Thanh tiến trình freeship */}
      <div className="progress mb-2" style={{ height: 6 }}>
        <div
          className="progress-bar bg-primary"
          style={{
            width: `${Math.min((total / FREE_SHIP_THRESHOLD) * 100, 100)}%`,
          }}
        ></div>
      </div>

      {/* Thông báo freeship */}
      {isFreeShip ? (
        <p className="text-success fw-bold">Đã được miễn phí vận chuyển</p>
      ) : (
        <p className="text-muted">
          Bạn cần mua thêm{" "}
          <span className="text-danger fw-bold">
            {(FREE_SHIP_THRESHOLD - total).toLocaleString()}đ
          </span>{" "}
          để được freeship
        </p>
      )}

      <div className="row">
        {/* Bên trái: sản phẩm */}
        <div className="col-lg-8">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Thông tin sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>

          <div className="text-end mt-3">
            <strong>Tổng tiền: </strong>
            <span className="text-danger fw-bold">
              {total.toLocaleString()}đ
            </span>
            <br />
            <button className="btn btn-primary mt-2">Thanh toán</button>
          </div>
        </div>

        {/* Bên phải: mã giảm giá, thời gian giao, hóa đơn */}
        <div className="col-lg-4">
          <div className="border rounded p-3">
            <h6 className="mb-3">Các mã giảm giá có thể áp dụng:</h6>
            <div className="mb-3 d-flex flex-wrap gap-2">
              {["HELLO", "FREESHIP", "SUDES50K", "SUDES50"].map((code) => (
                <span key={code} className="badge bg-danger">
                  {code}
                </span>
              ))}
            </div>

            <h6 className="mt-4">Thời gian giao hàng</h6>
            <div className="row mb-2">
              <div className="col">
                <input type="date" className="form-control" />
              </div>
              <div className="col">
                <select className="form-select">
                  <option>Chọn thời gian</option>
                  <option>Sáng</option>
                  <option>Chiều</option>
                  <option>Tối</option>
                </select>
              </div>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="invoiceCheck"
                checked={showInvoice}
                onChange={(e) => setShowInvoice(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="invoiceCheck">
                Xuất hóa đơn công ty
              </label>
            </div>

            {showInvoice && (
              <>
                <input
                  className="form-control mb-2"
                  placeholder="Tên công ty"
                />
                <input className="form-control mb-2" placeholder="Mã số thuế" />
                <textarea
                  className="form-control mb-2"
                  placeholder="Địa chỉ công ty"
                  rows="2"
                ></textarea>
                <input
                  className="form-control mb-2"
                  placeholder="Email nhận hóa đơn"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
