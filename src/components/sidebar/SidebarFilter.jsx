import React, { useState } from "react";

const SidebarFilter = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const current = filters[name] || [];
      const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      onFilterChange({ [name]: updated });
    } else {
      onFilterChange({ [name]: value });
    }
  };

  const handlePriceChange = (e) => {
    const value = +e.target.value;
    const newRange =
      e.target.name === "min" ? [value, priceRange[1]] : [priceRange[0], value];
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
        placeholder="Tìm kiếm..."
      />

      {/* Danh mục */}
      <div className="mb-3">
        <label className="form-label fw-bold">Danh mục</label>
        <select
          name="category"
          className="form-select"
          value={filters.category || ""}
          onChange={handleChange}
        >
          <option value="">Tất cả</option>
          <option value="phone">Điện thoại</option>
          <option value="laptop">Laptop</option>
          <option value="watch">Đồng hồ</option>
        </select>
      </div>
      {/* Mức giá */}
      <div className="mb-3">
        <label className="form-label fw-bold">
          Khoảng giá: {priceRange[0]}K
        </label>
        <div className="d-flex gap-2 align-items-center">
          <input
            type="range"
            name="min"
            min={0}
            max={5000}
            step={100}
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="custom-range w-100"
          />
        </div>
      </div>

      {/* Màu sắc - dàn ngang */}
      <div className="mb-3">
        <label className="form-label fw-bold d-block">Màu sắc</label>
        <div className="d-flex flex-wrap gap-2">
          {["red", "black", "white", "blue", "green"].map((color) => (
            <label
              key={color}
              className="form-check-label position-relative"
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid #ccc",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name="color"
                value={color}
                checked={filters.color?.includes(color) || false}
                onChange={handleChange}
                style={{
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Loại */}
      <div className="mb-3">
        <label className="form-label fw-bold">Loại</label>
        {["new", "hot", "sale"].map((type) => (
          <div className="form-check" key={type}>
            <input
              className="form-check-input"
              type="checkbox"
              name="type"
              id={type}
              value={type}
              checked={filters.type?.includes(type) || false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={type}>
              {type.toUpperCase()}
            </label>
          </div>
        ))}
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
              checked={filters.size?.includes(size) || false}
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
