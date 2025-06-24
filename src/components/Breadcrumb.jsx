import { NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const BreadcrumbWrapper = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CrumbLink = styled(NavLink)`
  text-decoration: none;
  color: #666;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
    color: #333;
  }
`;

const Separator = styled.span`
  color: #999;
`;

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <BreadcrumbWrapper>
      <CrumbLink to="/">Home</CrumbLink>
      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span
            key={routeTo}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Separator>/</Separator>
            {isLast ? (
              <span style={{ fontWeight: "bold" }}>
                {decodeURIComponent(name)}
              </span>
            ) : (
              <CrumbLink to={routeTo}>{decodeURIComponent(name)}</CrumbLink>
            )}
          </span>
        );
      })}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
