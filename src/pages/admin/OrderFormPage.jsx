import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { createOrder, getOrderById, updateOrder } from "../../api/orderApi";

const OrderFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { items: [] } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.products || res.data);
      } catch (err) {
        message.error("Không thể tải danh sách sản phẩm");
      }
    };

    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        reset(res.data);
      } catch (err) {
        message.error("Không thể tải đơn hàng");
      }
    };

    fetchProducts();
    if (isEdit) fetchOrder();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateOrder(id, data);
        message.success("Cập nhật đơn hàng thành công");
      } else {
        await createOrder(data);
        message.success("Tạo đơn hàng thành công");
      }
      navigate("/admin/orders");
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi lưu đơn hàng");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">{isEdit ? "Cập nhật" : "Tạo"} đơn hàng</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Thông tin khách hàng */}
        <div className="mb-3">
          <label className="form-label">Tên khách hàng</label>
          <input
            type="text"
            className="form-control"
            {...register("customerName", { required: "Không được để trống" })}
          />
          {errors.customerName && (
            <div className="text-danger">{errors.customerName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("customerEmail")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            {...register("customerAddress")}
          />
        </div>

        {/* Danh sách sản phẩm */}
        <hr className="my-4" />
        <h5>Sản phẩm trong đơn</h5>

        {fields.map((item, index) => (
          <div key={item.id} className="border rounded p-3 mb-3">
            <div className="row g-2 align-items-center">
              <div className="col-md-6">
                <select
                  className="form-control"
                  {...register(`items.${index}.productId`, {
                    required: true,
                  })}
                >
                  <option value="">Chọn sản phẩm</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Số lượng"
                  {...register(`items.${index}.quantity`, {
                    required: true,
                    min: 1,
                  })}
                />
              </div>
              <div className="col-md-3 text-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => remove(index)}
                >
                  Xoá
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary mb-3"
          onClick={() => append({ productId: "", quantity: 1 })}
        >
          ➕ Thêm sản phẩm
        </button>

        {/* Trạng thái đơn hàng */}
        <div className="mb-4">
          <label className="form-label">Trạng thái</label>
          <select className="form-control" {...register("status")}>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipping">Đang giao</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã huỷ</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Cập nhật" : "Tạo"} đơn hàng
        </button>
      </form>
    </div>
  );
};

export default OrderFormPage;
