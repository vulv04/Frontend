import React, { useState, useEffect } from "react";
import {
  Outlet,
  useNavigate,
  NavLink,
  useLocation,
  Link,
} from "react-router-dom";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  theme,
  Button,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  BarChartOutlined,
  ProfileOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined,
  BarsOutlined,
  AppstoreAddOutlined,
  StarOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role?.toLowerCase() !== "admin") {
      navigate("/api/auth/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/api/auth/login");
  };

  if (!user) return null;

  const userMenu = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={() => navigate(`/admin/me/profile/${user._id}`)}
        icon={<ProfileOutlined />}
      >
        Thông tin người dùng
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const navStyle = { textDecoration: "none" };

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: (
        <NavLink to="" style={navStyle}>
          Dashboard
        </NavLink>
      ),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: (
        <NavLink to="users" style={navStyle}>
          Users
        </NavLink>
      ),
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Sản phẩm",
      children: [
        {
          key: "productList",
          label: (
            <NavLink to="products" style={navStyle}>
              Danh sách sản phẩm
            </NavLink>
          ),
        },
        {
          key: "products/add",
          label: (
            <NavLink to="products/add" style={navStyle}>
              Thêm sản phẩm
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "categories",
      icon: <BarsOutlined />,
      label: "Danh mục",
      children: [
        {
          key: "categories",
          label: (
            <NavLink to="categories" style={navStyle}>
              Danh sách danh mục
            </NavLink>
          ),
        },
        {
          key: "categories/add",
          label: (
            <NavLink to="categories/add" style={navStyle}>
              Thêm danh mục
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "orders",
      icon: <ShoppingOutlined />,
      label: (
        <NavLink to="orders" style={navStyle}>
          Đơn hàng
        </NavLink>
      ),
    },
    {
      key: "banners",
      icon: <PictureOutlined />,
      label: "Banner",
      children: [
        {
          key: "banners",
          label: (
            <NavLink to="banners" style={navStyle}>
              Danh sách banner
            </NavLink>
          ),
        },
        {
          key: "addBanner",
          label: (
            <NavLink to="banners/add" style={navStyle}>
              Thêm banner
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "brands",
      icon: <StarOutlined />,
      label: "Thương hiệu",
      children: [
        {
          key: "brands",
          label: (
            <NavLink to="brands" style={navStyle}>
              Danh sách thương hiệu
            </NavLink>
          ),
        },
        {
          key: "addBrand",
          label: (
            <NavLink to="brands/add" style={navStyle}>
              Thêm thương hiệu
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "blogs",
      icon: <ProfileOutlined />,
      label: (
        <NavLink to="blogs" style={navStyle}>
          Bài viết
        </NavLink>
      ),
    },
    {
      key: "news",
      icon: <ProfileOutlined />,
      label: (
        <NavLink to="news" style={navStyle}>
          Tin tức
        </NavLink>
      ),
    },
    {
      key: "reviews",
      icon: <MessageOutlined />,
      label: (
        <NavLink to="reviews" style={navStyle}>
          Đánh giá
        </NavLink>
      ),
    },
    {
      key: "analytics",
      icon: <BarChartOutlined />,
      label: (
        <NavLink to="analytics" style={navStyle}>
          Thống kê
        </NavLink>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={240}
        style={{
          display: "flex",
          overflow: "auto",
          height: "100vh",
          flexDirection: "column",
          background: "#001529",
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            background: "#001529",
            flexShrink: 0,
          }}
        >
          {collapsed ? "A" : "ADMIN"}
        </div>

        {/* Menu scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={["products", "categories", "variants"]}
            items={menuItems}
          />
        </div>
      </Sider>

      <Layout>
        {/* Header cố định */}
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 16px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />

          <Space size="middle">
            <Tooltip title="Thông báo">
              <Button type="text" icon={<BellOutlined />} />
            </Tooltip>
            <Tooltip title="Cài đặt">
              <NavLink to="settings" style={navStyle}>
                <Button type="text" icon={<SettingOutlined />} />
              </NavLink>
            </Tooltip>
            <Tooltip title="Trợ giúp">
              <Button type="text" icon={<QuestionCircleOutlined />} />
            </Tooltip>

            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${user.username}`}
                />
                <span>{user.username}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Content có thanh cuộn riêng */}
        <Content
          style={{
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
