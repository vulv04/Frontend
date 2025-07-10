import styled from "@emotion/styled";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterAdmin from "../components/FooterAdmin";
import HeaderAdmin from "../components/HeaderAdmin";
import SideBarAdmin from "../components/SideBarAdmin";
import Breadcrumb from "../components/Breadcrumb";

// Sidebar width constants
const SIDEBAR_WIDTH = {
  expanded: 240,
  collapsed: 80,
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderWrapper = styled.header`
  height: 60px;
  flex-shrink: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  padding-top: 60px;
  min-height: 0;
  overflow: hidden;
`;

const SideBarWrapper = styled.aside`
  width: ${(props) =>
    props.collapsed
      ? `${SIDEBAR_WIDTH.collapsed}px`
      : `${SIDEBAR_WIDTH.expanded}px`};
  transition: width 0.3s;
  background-color: #001529;
  color: white;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
`;

const Content = styled.main`
  margin-left: ${(props) =>
    props.collapsed
      ? `${SIDEBAR_WIDTH.collapsed}px`
      : `${SIDEBAR_WIDTH.expanded}px`};
  transition: margin-left 0.3s;
  padding: 16px;
  background-color: #f9f9f9;
  height: calc(100vh - 60px);
  overflow-y: auto;
  width: calc(
    100% -
      ${(props) =>
        props.collapsed
          ? `${SIDEBAR_WIDTH.collapsed}px`
          : `${SIDEBAR_WIDTH.expanded}px`}
  );
`;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <HeaderAdmin />
      </HeaderWrapper>
      <Body>
        <SideBarWrapper collapsed={collapsed}>
          <SideBarAdmin collapsed={collapsed} onToggle={handleToggleSidebar} />
        </SideBarWrapper>
        <Content collapsed={collapsed}>
          <Breadcrumb />
          <Outlet />
        </Content>
      </Body>
      <FooterAdmin />
    </LayoutWrapper>
  );
};

export default AdminLayout;
