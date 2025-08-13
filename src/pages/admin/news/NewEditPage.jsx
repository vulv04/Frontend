import React, { useEffect, useState } from "react";
import { getNewsById, updateNews } from "../../../api/newsApi";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message, Typography, Card, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import slugify from "slugify";

const { Title } = Typography;

const NewEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  // 🧠 Tự tạo slug từ title
  useEffect(() => {
    const newSlug = slugify(titleValue || "", { lower: true, strict: true });
    setValue("slug", newSlug);
  }, [titleValue, setValue]);

  // 🛠️ Lấy dữ liệu bài viết theo id
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        reset({
          title: data.title,
          slug: data.slug,
          description: data.description,
          content: data.content,
        });
      } catch (error) {
        message.error("Không tìm thấy bài viết.");
        navigate("/admin/news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, reset, navigate]);

  // 🧾 Submit cập nhật bài viết
  const onSubmit = async (data) => {
    try {
      await updateNews(id, data);
      message.success("Cập nhật bài viết thành công");
      navigate("/admin/news");
    } catch (error) {
      message.error("Cập nhật bài viết thất bại");
    }
  };

  if (loading) return <Spin />;

  return (
    <Card title={<Title level={3}>Chỉnh sửa bài viết</Title>} bordered={false}>
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
            Cập nhật bài viết
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewEditPage;
