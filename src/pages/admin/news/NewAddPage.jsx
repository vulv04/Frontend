import React, { useEffect, useState } from "react";
import { createNews } from "../../../api/newsApi";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Typography, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import slugify from "slugify";

const { Title } = Typography;

const NewAddPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
    },
  });

  const titleValue = watch("title");

  // 🧠 Tự động tạo slug từ tiêu đề
  useEffect(() => {
    const newSlug = slugify(titleValue || "", { lower: true, strict: true });
    setValue("slug", newSlug);
  }, [titleValue, setValue]);

  // 🧾 Submit tạo bài viết
  const onSubmit = async (data) => {
    try {
      const response = await createNews(data);
      message.success(`Tạo tin tức thành công. Slug: ${response.slug}`);
      navigate("/admin/news");
    } catch (error) {
      message.error("Tạo tin tức thất bại");
    }
  };

  return (
    <Card title={<Title level={3}>Tạo bài viết mới</Title>} bordered={false}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Tiêu đề" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Tiêu đề là bắt buộc" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Slug">
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input {...field} disabled placeholder="Slug tự tạo từ tiêu đề" />
            )}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={4} {...field} />}
          />
        </Form.Item>

        <Form.Item label="Nội dung" required>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Nội dung là bắt buộc" }}
            render={({ field }) => <Input.TextArea rows={8} {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo bài viết
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewAddPage;
