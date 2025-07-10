import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  MessageOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

// Sidebar width constants
const SIDEBAR_WIDTH = {
  expanded: 240,
  collapsed: 80,
};

const SidebarWrapper = styled.div`
  width: ${(props) =>
    props.collapsed
      ? `${SIDEBAR_WIDTH.collapsed}px`
      : `${SIDEBAR_WIDTH.expanded}px`};
  transition: width 0.3s ease;
  background-color: #001529;
  color: white;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-bottom: 24px;
  font-size: 20px;
  align-self: ${(props) => (props.collapsed ? "center" : "flex-end")};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled(NavLink, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "collapsed",
})`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;

  &:hover {
    background-color: #1677ff44;
  }

  &.active {
    background-color: #1677ff;
    color: #fff;
  }

  i {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${(props) => (props.collapsed ? "0" : "12px")};
    flex-shrink: 0;
  }

  span {
    display: ${(props) => (props.collapsed ? "none" : "inline")};
    transition: opacity 0.2s ease;
    white-space: nowrap;
  }
`;

const SideBarAdmin = ({ collapsed, onToggle }) => {
  return (
    <SidebarWrapper collapsed={collapsed}>
      <ToggleButton collapsed={collapsed} onClick={onToggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </ToggleButton>

      <Menu>
        <MenuItem to="" collapsed={collapsed}>
          <i>
            <HomeOutlined />
          </i>
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem to="users" collapsed={collapsed}>
          <i>
            <UserOutlined />
          </i>
          <span>Users</span>
        </MenuItem>
        <MenuItem to="products" collapsed={collapsed}>
          <i>
            <AppstoreOutlined />
          </i>
          <span>Products</span>
        </MenuItem>
        <MenuItem to="orders" collapsed={collapsed}>
          <i>
            <ShoppingOutlined />
          </i>
          <span>Orders</span>
        </MenuItem>
        <MenuItem to="categories" collapsed={collapsed}>
          <i>
            <ProfileOutlined />
          </i>
          <span>Categories</span>
        </MenuItem>
        <MenuItem to="posts" collapsed={collapsed}>
          <i>
            <ProfileOutlined />
          </i>
          <span>Posts</span>
        </MenuItem>
        <MenuItem to="reviews" collapsed={collapsed}>
          <i>
            <UserOutlined />
          </i>
          <span>Reviews</span>
        </MenuItem>
        <MenuItem to="contact" collapsed={collapsed}>
          <i>
            <MessageOutlined />
          </i>
          <span>Contact</span>
        </MenuItem>
        <MenuItem to="analytics" collapsed={collapsed}>
          <i>
            <BarChartOutlined />
          </i>
          <span>Analytics</span>
        </MenuItem>
        <MenuItem to="settings" collapsed={collapsed}>
          <i>
            <SettingOutlined />
          </i>
          <span>Settings</span>
        </MenuItem>
      </Menu>
    </SidebarWrapper>
  );
};

export default SideBarAdmin;
