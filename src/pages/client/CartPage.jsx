import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../api/cartApi";
import { message } from "antd";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

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

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Không có sản phẩm trong giỏ hàng.
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="card mb-3 shadow-sm border-0"
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className="img-fluid rounded-start"
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{item.productId.name}</h5>
                        <h5 className="text-danger fw-bold">
                          {item.productId.price.toLocaleString()}₫
                        </h5>
                      </div>
                      <p className="card-text mb-1">
                        <small className="text-muted">
                          Màu: {item.color}, Size: {item.size}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Số lượng: {item.quantity}
                        </small>
                      </p>
                      <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => handleRemove(item.productId._id)}
                      >
                        Xóa sản phẩm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng thanh toán */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Tóm tắt đơn hàng</h5>
              <div className="d-flex justify-content-between">
                <span>Tổng tiền:</span>
                <strong className="text-danger">
                  {totalAmount.toLocaleString()}₫
                </strong>
              </div>
              <button className="btn btn-primary mt-4 w-100">
                Thanh toán ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
