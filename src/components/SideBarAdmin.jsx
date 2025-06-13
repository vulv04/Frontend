import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import {
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiBox,
  FiSettings,
  FiHome,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

// Sidebar container
const SidebarWrapper = styled.div`
  width: ${(props) => (props.collapsed ? "80px" : "240px")};
  transition: width 0.3s ease;
  background-color: #2c3e50;
  color: white;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* Thay đổi này: */
  max-height: auto; /* hoặc max-height: 60vh; */
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
`;


// Collapse toggle button
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

// Menu container
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// MenuItem: fix prop warning by filtering "collapsed" from being passed to DOM
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
    background-color: #34495e;
  }

  &.active {
    color: #fff;
  }

  i {
    width: 24px;
    height: 24px;
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


const SiderBarAdmin = ({ collapsed, onToggle }) => {
  return (
    <SidebarWrapper collapsed={collapsed}>
      <ToggleButton collapsed={collapsed} onClick={onToggle}>
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </ToggleButton>

      <Menu>
        <MenuItem to="" collapsed={collapsed}>
          <i>
            <FiHome />
          </i>
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem to="users" collapsed={collapsed}>
          <i>
            <FiUser />
          </i>
          <span>Users</span>
        </MenuItem>
        <MenuItem to="products" collapsed={collapsed}>
          <i>
            <FiBox />
          </i>
          <span>Products</span>
        </MenuItem>
        <MenuItem to="orders" collapsed={collapsed}>
          <i>
            <FiBox />
          </i>
          <span>Orders</span>
        </MenuItem>
        <MenuItem to="categories" collapsed={collapsed}>
          <i>
            <FiBox />
          </i>
          <span>Categories</span>
        </MenuItem>
        <MenuItem to="posts" collapsed={collapsed}>
          <i>
            <FiBox />
          </i>
          <span>Posts</span>
        </MenuItem>
        <MenuItem to="reviews" collapsed={collapsed}>
          <i>
            <FiUser />
          </i>
          <span>Reviews</span>
        </MenuItem>
        <MenuItem to="contact" collapsed={collapsed}>
          <i>
            <FiUser />
          </i>
          <span>Contact</span>
        </MenuItem>
        <MenuItem to="analytics" collapsed={collapsed}>
          <i>
            <FiBox />
          </i>
          <span>Analytics</span>
        </MenuItem>
        <MenuItem to="settings" collapsed={collapsed}>
          <i>
            <FiSettings />
          </i>
          <span>Settings</span>
        </MenuItem>
      </Menu>
    </SidebarWrapper>
  );
};

export default SiderBarAdmin;
