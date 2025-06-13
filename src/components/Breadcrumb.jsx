import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-light px-4 py-2 d-flex align-items-center gap-2">
      <FaHome className="text-primary" />
      <Link to="/" className="text-dark text-decoration-none">
        Trang chủ
      </Link>
      {items.map((item, index) => (
        <span key={index} className="d-flex align-items-center gap-2">
          <span className="text-muted">›</span>
          {item.link ? (
            <Link to={item.link} className="text-primary text-decoration-none">
              {item.label}
            </Link>
          ) : (
            <span className="text-muted">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
