import React from "react";
import NewsCard from "./NewsCard";

export default function NewsGrid({ articles }) {
  const topArticles = articles.slice(0, 6); // Lấy 3 bài viết đầu tiên

  return (
    <div className="row g-4">
      {topArticles.map((item) => (
        <div className="col-md-4" key={item.id}>
          <NewsCard article={item} />
        </div>
      ))}
    </div>
  );
}
