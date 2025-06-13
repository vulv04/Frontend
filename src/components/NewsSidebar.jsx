import React from "react";

export default function NewsSidebar({ featured }) {
  return (
    <div className="p-3">
      <h5 className="fw-bold">DANH MỤC TIN TỨC</h5>
      <ul className="list-unstyled mb-4">
        <li>
          <a href="#" className="text-primary text-decoration-none">
            Bắt kịp xu hướng
          </a>
        </li>
        <li>
          <a href="#" className="text-primary text-decoration-none">
            Xây dựng phong cách
          </a>
        </li>
      </ul>

      <h5 className="fw-bold">TIN TỨC NỔI BẬT</h5>
      {featured.slice(0, 3).map((item) => (
        <div key={item.id} className="d-flex mb-3">
          <img
            src={item.images?.[0]}
            alt={item.title}
            width={60}
            height={60}
            className="rounded object-fit-cover me-2"
          />
          <div>
            <p className="mb-1 small fw-semibold">{item.title}</p>
            <a href="#" className="text-muted small text-decoration-none">
              Xem thêm
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
