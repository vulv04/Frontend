import React, { useState } from "react";

const SidebarFilter = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "color") {
      // chỉ cho chọn 1 màu, click lại thì bỏ chọn
      if (filters.color === value) {
        onFilterChange({ [name]: "" });
      } else {
        onFilterChange({ [name]: value });
      }
    } else if (type === "checkbox") {
      // giữ nguyên logic cho các filter khác có nhiều lựa chọn
      const current = filters[name]?.split(",") || [];
      const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      onFilterChange({ [name]: updated.length ? updated.join(",") : "" });
    } else {
      // input thường
      onFilterChange({ [name]: value });
    }
  };
  
  
  

  const handlePriceChange = (e) => {
    const val = +e.target.value;
    const newRange =
      e.target.name === "min" ? [val, priceRange[1]] : [priceRange[0], val];
    setPriceRange(newRange);
    onFilterChange({ price: `${newRange[0]}-${newRange[1]}` });
  };

  return (
    <div className="border p-3 rounded bg-light">
      <h5 className="fw-bold mb-3">Bộ lọc sản phẩm</h5>

      {/* Tìm kiếm */}
      <input
        type="text"
        name="search"
        value={filters.search || ""}
        onChange={handleChange}
        className="form-control mb-3"
        placeholder="Tìm sản phẩm..."
      />

      {/* 🏷 Danh mục */}
      <div className="mb-3">
        <label className="form-label fw-bold">Danh mục</label>
        <select
          name="category"
          className="form-select"
          value={filters.category || ""}
          onChange={handleChange}
        >
          <option value="">Tất cả</option>
          <option value="Thời trang nam">Thời trang nam</option>
          <option value="Thời trang nữ">Thời trang nữ</option>
          <option value="Phụ kiện">Phụ kiện</option>
        </select>
      </div>

      {/* Giá */}
      <div className="mb-3">
        <label className="form-label fw-bold">
          Giá: {priceRange[0].toLocaleString()}đ -{" "}
          {priceRange[1].toLocaleString()}đ
        </label>
        <input
          type="range"
          name="min"
          min={0}
          max={500000}
          step={50000}
          value={priceRange[0]}
          onChange={handlePriceChange}
          className="form-range"
        />
        <input
          type="range"
          name="max"
          min={0}
          max={500000}
          step={50000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="form-range"
        />
      </div>

      {/* Màu sắc */}
      <div className="mb-3">
        <label className="form-label fw-bold d-block">Màu sắc</label>
        <div className="d-flex flex-wrap gap-2">
          {["black", "white", "brown", "blue", "red"].map((color) => {
            const isChecked = filters.color === color;
            return (
              <label
                key={color}
                className="position-relative d-inline-block"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: isChecked ? "3px solid #1890ff" : "2px solid #ddd",
                  boxShadow: isChecked
                    ? "0 0 0 4px rgba(24, 144, 255, 0.3)"
                    : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    backgroundColor: color,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                ></div>

                <input
                  type="checkbox" // đổi sang checkbox để bắt được click lại
                  name="color"
                  value={color}
                  checked={isChecked}
                  onChange={handleChange}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    inset: 0,
                    cursor: "pointer",
                  }}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="mb-3">
        <label className="form-label fw-bold">Size</label>
        {["S", "M", "L", "XL"].map((size) => (
          <div className="form-check" key={size}>
            <input
              className="form-check-input"
              type="checkbox"
              name="size"
              id={size}
              value={size}
              checked={filters.size?.split(",").includes(size) || false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={size}>
              {size}
            </label>
          </div>
        ))}
      </div>

      {/* Bộ sưu tập */}
      <div className="mb-3">
        <label className="form-label fw-bold">Bộ sưu tập</label>
        <select
          name="collection"
          className="form-select"
          value={filters.collection || ""}
          onChange={handleChange}
        >
          <option value="">Tất cả</option>
          <option value="summer">Hè 2024</option>
          <option value="winter">Đông 2024</option>
        </select>
      </div>
    </div>
  );
};

export default SidebarFilter;
