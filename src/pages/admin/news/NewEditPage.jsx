import React, { useEffect, useState } from "react";
import { getNewsById, updateNews } from "../../../api/newsApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Card,
  Upload,
  Space,
  Spin,
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
  formData.append("upload_preset", "unsigned_preset"); // preset của bạn

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

const NewEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

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
      image: "",
    },
  });

  const titleValue = watch("title");

  // 🧠 Tự động tạo slug từ tiêu đề
  useEffect(() => {
    const newSlug = slugify(titleValue || "", { lower: true, strict: true });
    setValue("slug", newSlug);
  }, [titleValue, setValue]);

  // 🛠️ Lấy dữ liệu bài viết
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        reset({
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          content: data.content || "",
          image: data.image || "",
        });
        setImageUrl(data.image || "");
      } catch (error) {
        message.error("Không tìm thấy bài viết.");
        navigate("/admin/news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id, reset, navigate]);

  // 📤 Submit cập nhật bài viết
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        ...data,
        image: finalImageUrl,
      };

      await updateNews(id, payload);
      message.success("Cập nhật bài viết thành công");
      navigate("/admin/news");
    } catch (error) {
      console.error(error);
      message.error("Cập nhật bài viết thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;

  return (
    <Card
      bordered={false}
      title={
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Title level={3} style={{ margin: 0 }}>
            Chỉnh sửa bài viết
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
              return false;
            }}
            maxCount={1}
            listType="picture-card"
          >
            <UploadOutlined /> Chọn ảnh
          </Upload>
          {imageUrl && !imageFile && (
            <img
              src={imageUrl}
              alt="preview"
              style={{
                marginTop: 10,
                width: 150,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />
          )}
        </Form.Item>

        {/* Nút submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Cập nhật bài viết
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewEditPage;
