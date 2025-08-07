import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { createOrder } from "../../api/orderApi";
import { createPayosOrder } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  message,
  Typography,
  Card,
  Row,
  Col,
} from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const CheckoutPage = () => {
  const { cartItems, totalPrice} = useCart();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.error("Lỗi lấy tỉnh/thành:", err));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => setDistricts(res.data.districts))
        .catch((err) => console.error("Lỗi lấy quận/huyện:", err));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => setWards(res.data.wards))
        .catch((err) => console.error("Lỗi lấy phường/xã:", err));
    }
  }, [selectedDistrict]);

  const handlePlaceOrder = async () => {
    try {
      const values = await form.validateFields();

      const provinceName =
        provinces.find((p) => p.code == selectedProvince)?.name || "";
      const districtName =
        districts.find((d) => d.code == selectedDistrict)?.name || "";
      const wardName = wards.find((w) => w.name == values.ward)?.name || "";

      const products = cartItems.map((item) => {
        const product = item.productId || item;
        const variant = item.variantId || {};

        return {
          productId: product._id,
          name: product.title || "Không tên",
          image: product.images?.[0] || variant.image || "",
          quantity: item.quantity,
          price: (product.price || 0) + (variant.price || 0),
          size: item.size || variant.size || "Chưa chọn",
          color: item.color || variant.color || "Chưa chọn",
          variantId: variant._id || item.variantId,
        };
      });

      const shippingAddress = {
        fullName: values.name,
        phone: values.phone,
        province: provinceName,
        district: districtName,
        ward: wardName,
        detail: values.address,
        note: values.note || "",
      };

      // ⚠️ Nếu backend đã lấy user từ token → KHÔNG CẦN gửi userId
      const orderData = {
        orderItems: products,
        shippingAddress,
        paymentMethod,
        totalPrice,
      };

      if (paymentMethod === "COD") {
        const newOrder = await createOrder(orderData);

        console.log("✅ Đơn hàng mới:", newOrder);

        if (!newOrder?._id) {
          throw new Error("Tạo đơn hàng thất bại: không có ID đơn hàng trả về");
        }
        navigate(`/checkout-success/${newOrder._id}`);
      } else if (paymentMethod === "PayOS") {
        const payosOrder = {
          address: `${values.address}, ${wardName}, ${districtName}, ${provinceName}`,
          phoneNumber: values.phone,
          note: values.note || "",
          products,
          totalPrice,
        };

        const { data } = await createPayosOrder(payosOrder);
        if (!data?.data?.checkoutUrl) {
          throw new Error("Không lấy được link thanh toán PayOS");
        }

        window.location.href = data.data.checkoutUrl;
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error?.response?.data || error.message);
      message.error("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Thanh toán</Title>
      <Row gutter={24}>
        <Col xs={24} md={14}>
          <Card title="Thông tin giao hàng">
            <Form layout="vertical" form={form}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập họ tên người nhận" size="large" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập số điện thoại" size="large" />
              </Form.Item>
              <Form.Item
                name="province"
                label="Tỉnh/Thành phố"
                rules={[{ required: true }]}
              >
                <Select
                  onChange={setSelectedProvince}
                  placeholder="Chọn tỉnh"
                  size="large"
                >
                  {provinces.map((p) => (
                    <Option key={p.code} value={p.code}>
                      {p.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="district"
                label="Quận/Huyện"
                rules={[{ required: true }]}
              >
                <Select
                  onChange={setSelectedDistrict}
                  placeholder="Chọn huyện"
                  size="large"
                >
                  {districts.map((d) => (
                    <Option key={d.code} value={d.code}>
                      {d.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="ward"
                label="Phường/Xã"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn xã" size="large">
                  {wards.map((w) => (
                    <Option key={w.code} value={w.name}>
                      {w.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ cụ thể"
                rules={[{ required: true }]}
              >
                <Input placeholder="Số nhà, đường, khu phố..." size="large" />
              </Form.Item>
              <Form.Item name="note" label="Ghi chú" rules={[{ max: 255 }]}>
                <Input.TextArea
                  placeholder="Ví dụ: Giao buổi tối, gọi trước khi đến..."
                  rows={3}
                  size="large"
                  maxLength={255}
                  showCount
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={10}>
          {cartItems.map((item, index) => {
            const price =
              (item.productId?.price || 0) + (item.variantId?.price || 0);
            return (
              <div key={index} style={{ display: "flex", marginBottom: 12 }}>
                <img
                  src={item.variantId?.image || item.productId?.images?.[0]}
                  alt="Ảnh sản phẩm"
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    marginRight: 12,
                    borderRadius: 8,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div>
                    <strong>{item.productId?.name}</strong>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor:
                          item.color || item.variantId?.color || "#ccc",
                        border: "1px solid #ddd",
                      }}
                    ></span>
                    <span>
                      / {item.size || item.variantId?.size || "Không có size"}
                    </span>
                  </div>
                  <div>Số lượng: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 500 }}>
                  {price.toLocaleString()} ₫
                </div>
              </div>
            );
          })}

          <Card title="Phương thức thanh toán">
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
              <Radio value="PayOS">Thanh toán qua PayOS</Radio>
            </Radio.Group>

            <Button
              type="primary"
              size="large"
              block
              style={{ marginTop: 20 }}
              onClick={handlePlaceOrder}
            >
              Đặt hàng
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
