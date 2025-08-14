import React, { useEffect, useState } from "react";
import { Spin, Typography, message } from "antd";
import { getNewsById } from "../../api/newsApi";

const { Title, Paragraph } = Typography;

const NewsDetailPage = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await getNewsById();
        console.log(res);
        setNews(res);
      } catch (err) {
        message.error("Không thể tải chi tiết bài viết");
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  },[]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!news) {
    return <p>Không tìm thấy bài viết.</p>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Title level={2}>{news.title}</Title>
      <p style={{ color: "#888" }}>
        Tác giả: {news.author?.name || "Không rõ"} | Ngày:{" "}
        {new Date(news.createdAt).toLocaleDateString()}
      </p>
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          style={{ width: "100%", borderRadius: 8, margin: "20px 0" }}
        />
      )}
      <Paragraph>{news.content}</Paragraph>
    </div>
  );
};

export default NewsDetailPage;
