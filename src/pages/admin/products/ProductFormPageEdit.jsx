import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Card,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../api/category";
import { getAllBrands } from "../../../api/brandApi";
import { getProductById, updateProduct } from "../../../api/productApi";
import { updateVariant } from "../../../api/variantApi";
const { Title } = Typography;
const { TextArea } = Input;

const ProductFormPageEdit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imageMode, setImageMode] = useState("url");
  const [imageFiles, setImageFiles] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { variants: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const watchTitle = watch("title");

  useEffect(() => {
    setValue("slug", slugify(watchTitle || ""));
  }, [watchTitle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes, productRes] = await Promise.all([
          getCategories(),
          getAllBrands(),
          getProductById(id),
        ]);
        console.log(productRes.data);
        setCategories(
          catRes.data.data.map((cat) => ({
            label: cat.title,
            value: cat.title,
          }))
        );
        setBrands(
          brandRes.data.brands.map((b) => ({
            label: b.name,
            value: b.name,
          }))
        );
        console.log(brandRes.data?.brands);
        const product = productRes.data;
        if (!product) return message.error("Không tìm thấy sản phẩm");
        reset({
          ...product,
          variants: product.variants || [],
        });
      } catch (err) {
        console.error(err);
        message.error("Không thể tải dữ liệu sản phẩm");
      }
    };

    fetchData();
  }, [id, reset, append]);

  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx1r7axdz/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!res.ok || !data.secure_url) throw new Error("Upload ảnh thất bại");

    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      const { variants, ...productData } = data;

      if (typeof productData.images === "string") {
        productData.images = productData.images
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean);
      }

      if (imageFiles.length > 0) {
        const uploaded = await Promise.all(imageFiles.map(uploadToCloudinary));
        productData.images = [...(productData.images || []), ...uploaded];
      }

      await updateProduct(id, productData);

      if (variants && variants.length) {
        await Promise.all(
          variants.map((variant) => {
            let images = [];
            if (variant.images && typeof variant.images === "string") {
              images = variant.images
                .split(",")
                .map((url) => url.trim())
                .filter(Boolean);
            }

            return updateVariant(variant._id, {
              ...variant,
              images,
              product: id,
            });
          })
        );
      }

      message.success("Cập nhật sản phẩm thành công");
      nav("/admin/products");
    } catch (err) {
      console.error(err);
      message.error("Cập nhật sản phẩm thất bại");
    }
  };

  return (
    <Card
      title={<Title level={3}>Sửa sản phẩm</Title>}
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Tên sản phẩm" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Giá" required>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </Form.Item>

        <Form.Item label="Thương hiệu">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <Select {...field} options={brands} allowClear />
            )}
          />
        </Form.Item>

        <Form.Item label="Danh mục" required>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} options={categories} />}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextArea rows={4} {...field} />}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Select
            defaultValue={imageMode}
            style={{ width: 120, marginBottom: 8 }}
            onChange={setImageMode}
            options={[
              { label: "URL", value: "url" },
              { label: "File", value: "file" },
            ]}
          />
          {imageMode === "url" ? (
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <TextArea
                  rows={2}
                  placeholder="Nhập URL, cách nhau bởi dấu phẩy"
                  {...field}
                />
              )}
            />
          ) : (
            <Upload
              beforeUpload={(file) => {
                setImageFiles((prev) => [...prev, file]);
                return false;
              }}
              multiple
              fileList={imageFiles.map((file) => ({
                uid: file.uid || file.name,
                name: file.name,
              }))}
              showUploadList
              onRemove={(file) => {
                setImageFiles((prev) =>
                  prev.filter((f) => f.name !== file.name)
                );
              }}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh</Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item label="Biến thể sản phẩm">
          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{
                marginBottom: 16,
                padding: 12,
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Controller
                  name={`variants.${index}.color`}
                  control={control}
                  render={({ field }) => (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Input
                        placeholder="Màu (vd: red, #00ff00)"
                        style={{ width: 120 }}
                        {...field}
                      />
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: field.value || "transparent",
                          border: "1px solid #ccc",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  )}
                />

                <Controller
                  name={`variants.${index}.size`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Size"
                      style={{ width: 100 }}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name={`variants.${index}.stock`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Tồn kho"
                      type="number"
                      style={{ width: 100 }}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name={`variants.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Giá biến thể"
                      type="number"
                      style={{ width: 120 }}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name={`variants.${index}.sku`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="SKU"
                      style={{ width: 150 }}
                      {...field}
                    />
                  )}
                />
              </div>

              <Controller
                name={`variants.${index}.images`}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="URL ảnh biến thể, cách nhau bởi dấu phẩy"
                    rows={2}
                    style={{ marginTop: 8 }}
                  />
                )}
              />

              <div style={{ textAlign: "right", marginTop: 8 }}>
                <Button danger onClick={() => remove(index)}>
                  Xóa biến thể
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="dashed"
            onClick={() =>
              append({
                color: "",
                size: "",
                stock: 0,
                price: 0,
                sku: "",
                isActive: true,
                images: "",
              })
            }
          >
            + Thêm biến thể
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductFormPageEdit;
