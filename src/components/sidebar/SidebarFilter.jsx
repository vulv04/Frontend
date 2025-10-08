import React, { useState } from "react";

const SidebarFilter = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const current = filters[name]?.split(",") || [];
      const updated = checked
        ? [...current, value]
        : current.filter((v) => v !== value);
      onFilterChange({ [name]: updated.length ? updated.join(",") : "" });
    } else {
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

      {/* 🔍 Tìm kiếm */}
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

      {/* 💰 Giá */}
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

      {/* 🎨 Màu sắc */}
      <div className="mb-3">
        <label className="form-label fw-bold d-block">Màu sắc</label>
        <div className="d-flex flex-wrap gap-2">
          {["black", "white", "brown", "blue", "red"].map((color) => (
            <label
              key={color}
              className="position-relative"
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid #ddd",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name="color"
                value={color}
                checked={filters.color?.split(",").includes(color) || false}
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

      {/* 📏 Size */}
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

      {/* 🧥 Bộ sưu tập */}
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
