import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsSidebar from "../../components/NewsSidebar";
import NewsGrid from "../../components/NewsGrid";
import { getProducts } from "../../api/productApi";
import Breadcrumb from "../../components/Breadcrumb";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getProducts();
        setArticles(res.data);
      } catch (err) {
        console.error("Lỗi tải dữ liệu", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: "News", link: "/news" }]} />
      <div className="row">
        <div className="col-md-3">
          <NewsSidebar featured={articles} />
        </div>
        <div className="col-md-9">
          <h3 className="mb-4 fw-bold">Tin Tức Mới Nhất</h3>
          <NewsGrid articles={articles} />
        </div>
      </div>
    </div>
  );
}
