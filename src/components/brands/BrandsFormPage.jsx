import React, { useEffect } from "react";
import { Form, Input, Switch, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { createBrand, getBrandById, updateBrand } from "../../api/brandApi";
const BrandsFormPage = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchBrand = async () => {
        try {
          const res = await getBrandById(id);
          const data = res.data;
          form.setFieldsValue({
            name: data.name,
            logo: data.logo,
            isActive: data.isActive,
          });
        } catch (err) {
          message.error("Không thể tải thương hiệu");
        }
      };
      fetchBrand();
    }
  }, [id]);

  const onFinish = async (values) => {
    try {
      if (isEdit) {
        await updateBrand(id, values);
        message.success("Cập nhật thành công!");
      } else {
        await createBrand(values);
        message.success("Tạo thương hiệu thành công!");
      }
      navigate("/admin/brands");
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="container py-4">
      <h2>{isEdit ? "✏️ Cập nhật thương hiệu" : "➕ Thêm thương hiệu"}</h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ isActive: true }}
      >
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="VD: Nike, Adidas, Puma..." />
        </Form.Item>

        <Form.Item
          label="Logo (URL hình ảnh)"
          name="logo"
          rules={[{ required: true, message: "Vui lòng nhập URL logo" }]}
        >
          <Input placeholder="https://example.com/logo.jpg" />
        </Form.Item>

        <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
          <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BrandsFormPage;
