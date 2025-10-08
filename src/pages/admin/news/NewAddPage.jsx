import React, { useEffect, useState } from "react";
import { createNews } from "../../../api/newsApi";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Card,
  Upload,
  Space,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import slugify from "slugify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const { Title } = Typography;

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset"); // thay bằng preset của bạn

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dx1r7axdz/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!res.ok || !data.secure_url) {
    throw new Error("Upload ảnh thất bại");
  }
  return data.secure_url;
};

const NewAddPage = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
      image: "",
    },
  });

  const titleValue = watch("title");

  // 🧠 Tự động tạo slug từ tiêu đề
  useEffect(() => {
    const newSlug = slugify(titleValue || "", { lower: true, strict: true });
    setValue("slug", newSlug);
  }, [titleValue, setValue]);

  // Submit tạo bài viết
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = data.image;

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        ...data,
        image: imageUrl,
      };

      const response = await createNews(payload);
      message.success(`Tạo tin tức thành công. Slug: ${response.slug}`);
      navigate("/admin/news");
    } catch (error) {
      console.error(error);
      message.error("Tạo tin tức thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      bordered={false}
      title={
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Title level={3} style={{ margin: 0 }}>
            Tạo bài viết mới
          </Title>
        </Space>
      }
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Tiêu đề */}
        <Form.Item label="Tiêu đề" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Tiêu đề là bắt buộc" }}
            render={({ field }) => (
              <Input {...field} placeholder="Nhập tiêu đề..." />
            )}
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
        </Form.Item>

        {/* Slug */}
        <Form.Item label="Slug">
          <Controller
            name="slug"
            control={control}
            render={({ field }) => <Input {...field} disabled />}
          />
        </Form.Item>
        {/* Nội dung */}
        <Form.Item label="Nội dung" required>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Nội dung là bắt buộc" }}
            render={({ field }) => (
              <SunEditor
                setContents={field.value}
                onChange={(content) => field.onChange(content)}
                setOptions={{
                  height: 400,
                  buttonList: [
                    ["undo", "redo"],
                    ["bold", "underline", "italic", "strike"],
                    ["list", "align", "fontSize", "formatBlock"],
                    ["link", "image", "video", "table"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["removeFormat"],
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <span style={{ color: "red" }}>{errors.content.message}</span>
          )}
        </Form.Item>

        {/* Ảnh đại diện */}
        <Form.Item label="Ảnh đại diện">
          <Upload
            beforeUpload={(file) => {
              setImageFile(file);
              return false; // Không upload tự động
            }}
            maxCount={1}
            listType="picture-card"
          >
            <UploadOutlined /> Chọn ảnh
          </Upload>
        </Form.Item>

        {/* Nút submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Tạo bài viết
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewAddPage;
