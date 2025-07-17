import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../api/cartApi";
import { message } from "antd";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState({
    companyName: "",
    taxCode: "",
    companyAddress: "",
    email: "",
  });

  const token = localStorage.getItem("token");
  const FREESHIP_THRESHOLD = 1000000;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCartItems(res.data.items);
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId, token);
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      message.error("Không thể xóa sản phẩm");
    }
  };

  const handleQuantityChange = (productId, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId._id === productId) {
          const newQuantity =
            type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  

  const missingAmount = Math.max(FREESHIP_THRESHOLD - totalAmount, 0);
  const progressPercent = Math.min(
    (totalAmount / FREESHIP_THRESHOLD) * 100,
    100
  );

  return (
    <div className="container my-5">
      <h5 className="fw-bold mb-3">🛒 GIỎ HÀNG</h5>

      {/* Thanh freeship */}
      <div className="mb-3">
        <p className="mb-1">
          {missingAmount === 0 ? (
            <span className="text-success">
              Bạn đã đủ điều kiện được freeship!
            </span>
          ) : (
            <>
              Bạn cần mua thêm{" "}
              <span className="text-danger fw-bold">
                {missingAmount.toLocaleString()}₫
              </span>{" "}
              để được freeship
            </>
          )}
        </p>
        <div className="progress" style={{ height: "8px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Không có sản phẩm trong giỏ hàng.
        </div>
      ) : (
        <div className="row">
          {/* Cột trái - danh sách sản phẩm */}
          <div className="col-lg-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const product = item.productId;
                  if (!product) return null;

                  return (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            style={{
                              width: "70px",
                              height: "90px",
                              objectFit: "contain",
                              border: "1px solid #ddd",
                              marginRight: "10px",
                            }}
                          />
                          <div>
                            <p className="mb-1 fw-bold">{product.name}</p>
                            <p
                              className="mb-1 text-muted"
                              style={{ fontSize: "13px" }}
                            >
                              {item.size} / {item.color}
                            </p>
                            <button
                              className="btn btn-link p-0 text-danger"
                              onClick={() => handleRemove(product._id)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{product.price.toLocaleString()}₫</td>
                      <td>{/* quantity buttons */}</td>
                      <td>
                        {(product.price * item.quantity).toLocaleString()}₫
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="text-end fw-bold">
              Tổng tiền:{" "}
              <span className="text-danger">
                {totalAmount.toLocaleString()}₫
              </span>
            </div>
            <Link to="/checkout">
              <button className="btn btn-primary mt-3 float-end">
                Thanh toán
              </button>
            </Link>
          </div>

          {/* Cột phải - mã giảm giá & hóa đơn */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-3">
              <h6 className="fw-bold mb-2">Các mã giảm giá có thể áp dụng:</h6>
              <div className="mb-3">
                {["HELLO", "FREESHIP", "SUDESS0K", "SUDESS0"].map((code) => (
                  <span
                    key={code}
                    className="badge bg-danger text-white me-2 mb-2"
                    style={{ fontSize: "12px", cursor: "pointer" }}
                  >
                    {code}
                  </span>
                ))}
              </div>

              <h6 className="fw-bold">Thời gian giao hàng</h6>
              <div className="d-flex gap-2 mb-3">
                <input type="date" />
                <input type="date" />
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="invoice"
                  checked={showInvoice}
                  onChange={() => setShowInvoice(!showInvoice)}
                />
                <label htmlFor="invoice" className="form-check-label">
                  Xuất hóa đơn công ty
                </label>
              </div>

              {showInvoice && (
                <>
                  <div className="mb-2">
                    <label className="form-label">Tên công ty</label>
                    <input
                      type="text"
                      className="form-control"
                      value={invoiceInfo.companyName}
                      onChange={(e) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Mã số thuế</label>
                    <input
                      type="text"
                      className="form-control"
                      value={invoiceInfo.taxCode}
                      onChange={(e) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          taxCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Địa chỉ công ty</label>
                    <textarea
                      rows={2}
                      className="form-control"
                      value={invoiceInfo.companyAddress}
                      onChange={(e) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          companyAddress: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email nhận hoá đơn</label>
                    <input
                      type="email"
                      className="form-control"
                      value={invoiceInfo.email}
                      onChange={(e) =>
                        setInvoiceInfo({
                          ...invoiceInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
