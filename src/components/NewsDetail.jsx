import React from "react";

export default function NewsDetail({ article, onBack }) {
  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack} style={{ marginBottom: 20 }}>
        ← Quay lại
      </button>
      <h1>{article.title}</h1>
      <img
        src={article.image || article.images?.[0]}
        alt={article.title}
        style={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
      <p style={{ marginTop: 20 }}>
        {article.description || "Không có nội dung chi tiết."}
      </p>
      <p>
        Giá sản phẩm (giả làm ngày đăng): <strong>${article.price}</strong>
      </p>
    </div>
  );
}
