// src/components/QuickViewModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const QuickViewModal = ({ show, onClose, product }) => {
  if (!product) return null;

  const {
    title,
    price,
    oldPrice,
    thumbnail,
    images = [],
    sizes = [],
    variants = [],
    stockStatus = "Còn hàng",
  } = product;
  const validImages = [thumbnail, ...images].filter(Boolean);
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {/* Hình ảnh */}
          <div className="col-md-6">
            <img
              src={thumbnail || images[0]}
              alt={title}
              className="img-fluid mb-3 border rounded"
              style={{ height: 300, objectFit: "cover", width: "100%" }}
            />
            <div className="d-flex gap-2">
              {[thumbnail, ...images].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="img-thumbnail"
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                />
              ))}
            </div>
          </div>

          {/* Thông tin */}
          <div className="col-md-6">
            <p>
              <strong>Tình trạng:</strong>{" "}
              <span className="text-success">{stockStatus}</span>
            </p>
            <p>
              <strong>Giá:</strong>{" "}
              <span className="text-primary fs-4 fw-bold">
                {price.toLocaleString()}₫
              </span>{" "}
              {oldPrice && (
                <del className="text-muted ms-2">
                  {oldPrice.toLocaleString()}₫
                </del>
              )}
            </p>

            <div className="mb-3">
              <strong>Kích thước:</strong>
              <div className="d-flex gap-2 mt-2">
                {sizes.map((size, i) => (
                  <button key={i} className="btn btn-outline-secondary btn-sm">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <strong>Màu sắc:</strong>
              <div className="d-flex gap-2 mt-2">
                {variants.map((color, i) => (
                  <div
                    key={i}
                    title={color}
                    style={{
                      backgroundColor: color,
                      width: 25,
                      height: 25,
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-3 d-flex gap-2 align-items-center">
              <label htmlFor="quantity">Số lượng:</label>
              <select id="quantity" className="form-select w-auto">
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <Button variant="primary" className="w-100">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuickViewModal;
