import React from "react";

export default function NewsCard({ article }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img
          src={article.images?.[0]}
          className="card-img-top"
          alt={article.title}
          style={{ height: 200, objectFit: "cover" }}
        />
        <span className="badge bg-primary position-absolute top-0 start-0 m-2">
          Ngày 26, Tháng 08, 2023
        </span>
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{article.title}</h6>
        <p className="card-text text-truncate">
          {article.description || "Không có mô tả."}
        </p>
        <a
          href="#"
          className="mt-auto text-decoration-none d-flex align-items-center gap-1"
        >
          <i className="bi bi-plus-circle"></i> Xem thêm
        </a>
      </div>
    </div>
  );
}
