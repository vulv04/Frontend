import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orderApi";
import "../../assets/css/CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [shipping, setShipping] = useState({
    email: "vulv04.dev@gmail.com",
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p/").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => {
          setDistricts(res.data.districts || []);
          setSelectedDistrict("");
          setWards([]);
          setSelectedWard("");
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => {
          setWards(res.data.wards || []);
          setSelectedWard("");
        });
    }
  }, [selectedDistrict]);

  const handlePlaceOrder = async () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !paymentMethod
    ) {
      return alert(
        "Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán."
      );
    }

    const fullAddress = `${shipping.address}, ${
      wards.find((w) => w.code == selectedWard)?.name
    }, ${districts.find((d) => d.code == selectedDistrict)?.name}, ${
      provinces.find((p) => p.code == selectedProvince)?.name
    }`;

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
      })),
      shippingAddress: {
        ...shipping,
        address: fullAddress,
      },
      paymentMethod,
      totalPrice: totalAmount || 0,
    };

    try {
      const newOrder = await createOrder(orderData);
      clearCart();
      navigate(`/orders/${newOrder._id}`);
    } catch (error) {
      alert("Đặt hàng thất bại");
    }
  };

  return (
    <div className="checkout-wrapper container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="checkout-box">
            <h5 className="checkout-title">Thông tin nhận hàng</h5>
            <input
              disabled
              className="form-control mb-2"
              value="Địa chỉ khác..."
            />
            <input
              disabled
              className="form-control mb-2"
              value={shipping.email}
            />
            <input
              className="form-control mb-2"
              placeholder="Họ và tên"
              value={shipping.fullName}
              onChange={(e) =>
                setShipping({ ...shipping, fullName: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Số điện thoại"
              value={shipping.phone}
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Số nhà, tên đường"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
            />

            <select
              className="form-select mb-2"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Tỉnh thành</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="form-select mb-2"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Quận huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              className="form-select mb-2"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
            >
              <option value="">Phường xã</option>
              {wards.map((w) => (
                <option key={w.code} value={w.code}>
                  {w.name}
                </option>
              ))}
            </select>

            <textarea
              className="form-control mb-2"
              placeholder="Ghi chú (tùy chọn)"
              rows={3}
              value={shipping.note}
              onChange={(e) =>
                setShipping({ ...shipping, note: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="col-md-4">
          <div className="checkout-box">
            <h5 className="checkout-title">Vận chuyển</h5>
            <div className="shipping-info">
              Vui lòng nhập thông tin giao hàng
            </div>

            <h5 className="checkout-title mt-4">Thanh toán</h5>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="bank"
                onChange={() => setPaymentMethod("Chuyển khoản")}
              />
              <label className="form-check-label" htmlFor="bank">
                Chuyển khoản
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="cod"
                onChange={() => setPaymentMethod("COD")}
              />
              <label className="form-check-label" htmlFor="cod">
                Thu hộ (COD)
              </label>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="checkout-box">
            <h5 className="checkout-title">
              Đơn hàng ({cartItems.length} sản phẩm)
            </h5>
            {cartItems.map((item) => (
              <div key={item._id} className="checkout-item d-flex gap-2 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-thumb"
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                />
                <div>
                  <strong>{item.name}</strong>
                  <p className="mb-0 small">
                    {item.size} / {item.color}
                  </p>
                  <p className="mb-0 small">{item.price?.toLocaleString()}₫</p>
                </div>
              </div>
            ))}

            <input
              placeholder="Nhập mã giảm giá"
              className="form-control form-control-sm mb-2"
            />
            <button className="btn btn-primary w-100 mb-3">Áp dụng</button>

            <p className="mb-1">
              Tạm tính:{" "}
              <span className="float-end">
                {totalAmount?.toLocaleString()}₫
              </span>
            </p>
            <p className="mb-1">
              Phí vận chuyển: <span className="float-end">-</span>
            </p>
            <hr />
            <p className="fw-bold">
              Tổng cộng:{" "}
              <span className="float-end text-danger">
                {totalAmount?.toLocaleString()}₫
              </span>
            </p>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              ĐẶT HÀNG
            </button>
            <a
              href="/cart"
              className="d-block mt-3 text-decoration-none text-center"
            >
              ← Quay về giỏ hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
