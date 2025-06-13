import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const tags = [
  "Áo Thun",
  "Quần short",
  "Quần Kaki & Chino",
  "Mắt Kính",
  "Áo Ní Và Len",
  "Áo Khoác",
  "Áo Sơmi",
  "Áo Polo",
  "Hoodie",
  "Tank Top - Áo Ba Lỗ",
  "Quần Jogger",
];

const SearchBarWithTags = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container my-5">
      <div className="row align-items-start">
        {/* Search Box */}
        <div className="col-md-6 mb-3">
          <h4 className="fw-bold mb-3">MẶC GÌ HÔM NAY?</h4>
          <div className="input-group">
            <input
              type="text"
              className="form-control p-3"
              placeholder="Nhập tên sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>

        {/* Tags Section */}
        <div className="col-md-6 mb-3">
          <h5 className="fw-bold mb-3">Từ khóa nổi bật ngày hôm nay</h5>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                className="btn btn-outline-dark btn-sm rounded-pill"
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarWithTags;
