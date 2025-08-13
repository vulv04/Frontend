import React, { useEffect, useState, useRef } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "../../api/cartApi";
import {
  message,
  Button,
  Table,
  InputNumber,
  Popconfirm,
  Empty,
  Divider,
} from "antd";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [loadingItems, setLoadingItems] = useState({});
  const quantityTimers = useRef({});

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await getCart();
        const items = res.data?.items || [];
        setCartItems(items);
      } catch (err) {
        message.error("Lỗi khi tải giỏ hàng");
      }
    };
    fetchCartData();
  }, []);

  const updateQuantityDebounced = (item, quantity) => {
    const key = `${item.productId._id}-${item.color}-${item.size}`;
    clearTimeout(quantityTimers.current[key]);

    setCartItems((prevItems) =>
      prevItems.map((it) =>
        it?.productId?._id === item.productId._id &&
        it.color === item.color &&
        it.size === item.size
          ? { ...it, quantity }
          : it
      )
    );

    quantityTimers.current[key] = setTimeout(async () => {
      setLoadingItems((prev) => ({ ...prev, [key]: true }));
      try {
        await updateCartQuantity({
          productId: item.productId._id,
          variantId: item.variantId._id,
          quantity,
        });
      } catch (err) {
        message.warning("Hết hàng!");
      } finally {
        setLoadingItems((prev) => ({ ...prev, [key]: false }));
      }
    }, 500);
  };

  const handleBlur = async (item) => {
    const key = `${item.productId._id}-${item.color}-${item.size}`;
    if (quantityTimers.current[key]) return;
    await updateCartQuantity({
      productId: item.productId._id,
      variantId: item.variantId._id,
      quantity: item.quantity,
    });
  };

  const handleRemove = async (item) => {
    if (!item?.productId?._id || !item?.variantId?._id) return;
    try {
      await removeFromCart({
        productId: item.productId._id,
        variantId: item.variantId._id,
      });
      message.success("Đã xoá sản phẩm");
      setCartItems((prevItems) =>
        prevItems.filter(
          (i) =>
            !(
              i?.productId?._id === item.productId._id &&
              i.variantId._id === item.variantId._id
            )
        )
      );
    } catch (err) {
      message.error("Xoá thất bại");
    }
  };

  const totalAmount =
    cartItems?.reduce((acc, item) => {
      const base = item?.productId?.price || 0;
      const variant = item?.variantId?.price || 0;
      return acc + (base + variant) * (item?.quantity || 0);
    }, 0) || 0;

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productId",
      render: (product, item) => {
        if (!product) return <i>Sản phẩm đã bị xoá</i>;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <div>
              <div>
                <strong>{product.title}</strong>
              </div>
              <div>
                <span>Màu: {item.variantId?.color || item.color}</span> -{" "}
                <span>Size: {item.variantId?.size || item.size}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Giá",
      render: (_, item) => {
        const base = item?.productId?.price || 0;
        const variant = item?.variantId?.price || 0;
        const total = base + variant;
        return <span>{total.toLocaleString()}₫</span>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity, item) => {
        return (
          <InputNumber
            min={1}
            max={item.variantId?.stock || 10}
            value={quantity}
            onChange={(val) => updateQuantityDebounced(item, val)}
            onBlur={() => handleBlur(item)}
          />
        );
      },
    },
    {
      title: "Thành tiền",
      render: (_, item) => {
        const base = item?.productId?.price || 0;
        const variant = item?.variantId?.price || 0;
        const total = (base + variant) * (item?.quantity || 0);
        return <strong>{total.toLocaleString()}₫</strong>;
      },
    },
    {
      title: "Hành động",
      render: (_, item) => (
        <Popconfirm
          title="Xoá sản phẩm khỏi giỏ hàng?"
          onConfirm={() => handleRemove(item)}
          okText="Xoá"
          cancelText="Huỷ"
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
    },
  ];

  const validItems = cartItems.filter((item) => item?.productId?._id);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
      <h1>Giỏ hàng</h1>
      {validItems.length === 0 ? (
        <Empty description="Không có sản phẩm nào" />
      ) : (
        <>
          <Table
            dataSource={validItems}
            columns={columns}
            rowKey={(item) =>
              `${item?.productId?._id}-${item?.color}-${item?.size}`
            }
            pagination={false}
          />
          <Divider />
          <div style={{ textAlign: "right", fontSize: 18 }}>
            Tổng cộng: <strong>{totalAmount.toLocaleString()}₫</strong>
          </div>
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/checkout")}
            >
              Tiến hành thanh toán
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
