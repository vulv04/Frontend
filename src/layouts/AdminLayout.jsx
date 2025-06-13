import styled from "@emotion/styled";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterAdmin from "../components/FooterAdmin";
import HeaderAdmin from "../components/HeaderAdmin";
import SideBarAdmin from "../components/SideBarAdmin";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* full viewport height */
`;

const HeaderWrapper = styled.header`
  height: 60px; /* chiều cao header */
  flex-shrink: 0; /* không co lại */
  background-color: #fff; /* hoặc màu khác */
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
  padding-top: 60px; /* cách ra đúng bằng header */
  min-height: 0; /* để con flex có thể scroll */
  overflow: hidden;
`;

const SideBarWrapper = styled.aside`
  width: ${(props) => (props.collapsed ? "60px" : "240px")};
  transition: width 0.3s;
  background-color: #222;
  color: white;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
`;

const Content = styled.main`
  margin-left: ${(props) => (props.collapsed ? "60px" : "240px")};
  transition: margin-left 0.3s;
  padding: 16px;
  background-color: #f9f9f9;
  height: calc(100vh - 60px - 40px);
  overflow-y: auto;
  width: calc(100% - ${(props) => (props.collapsed ? "60px" : "240px")});
`;



const FooterWrapper = styled.footer`
  height: 40px;
  flex-shrink: 0;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgb(0 0 0 / 0.1);
  text-align: center;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
          <Outlet />
        </Content>
      </Body>
      <FooterWrapper>
        <FooterAdmin />
      </FooterWrapper>
    </LayoutWrapper>
  );
};

export default AdminLayout;
