import React, { useState } from "react";
import {
  Card,
  Avatar,
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  message,
  Tag,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";

const AdminProfilePage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: storedUser?.username || "",
      fullname: storedUser?.fullname || "",
      email: storedUser?.email || "",
      phone: storedUser?.phone || "",
      address: storedUser?.address || "",
    },
  });

  if (!storedUser) {
    return (
      <div className="container mt-5 text-center">
        <Card>
          <p>Bạn cần đăng nhập để xem trang hồ sơ quản trị.</p>
        </Card>
      </div>
    );
  }

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify({ ...storedUser, ...data }));
    message.success("Thông tin đã được cập nhật!");
    setIsEditing(false);
    reset(data);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <Card
        bordered
        title={
          <span>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Hồ sơ Quản trị viên
          </span>
        }
        extra={
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa
          </Button>
        }
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Avatar
            size={100}
            style={{ backgroundColor: "#1890ff" }}
            icon={<UserOutlined />}
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              storedUser.fullname || "Admin"
            )}&background=random`}
          />
          <h3 style={{ marginTop: 12 }}>{storedUser.fullname}</h3>
          <Tag color="geekblue" style={{ fontSize: 14 }}>
            {storedUser.role === "admin" ? "Administrator" : "User"}
          </Tag>
        </div>

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Tên đăng nhập">
            {storedUser.username}
          </Descriptions.Item>
          <Descriptions.Item label="Họ và tên">
            {storedUser.fullname}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {storedUser.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {storedUser.phone || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {storedUser.address || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {storedUser.role || "user"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Cập nhật thông tin quản trị"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleSubmit(onSubmit)}
        okText="Lưu thay đổi"
        okButtonProps={{ icon: <SaveOutlined /> }}
      >
        <Form layout="vertical">
          <Form.Item label="Tên đăng nhập">
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Họ và tên">
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProfilePage;
