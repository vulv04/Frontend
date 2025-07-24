import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button } from "antd";

const { Title, Paragraph, Text } = Typography;

const mockNews = [
  {
    id: 1,
    title: "Khai trương cửa hàng mới tại Hà Nội",
    description:
      "Denny Fashion khai trương cửa hàng mới với nhiều ưu đãi hấp dẫn...",
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80",
    date: "2025-07-15",
  },
  {
    id: 2,
    title: "Bộ sưu tập Thu - Đông 2025 đã có mặt",
    description: "Khám phá phong cách thời trang mới cho mùa thu đông năm nay.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    date: "2025-07-10",
  },
];

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(mockNews); // sau này bạn có thể gọi từ API
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
      <Title level={2}>Tin Tức & Sự Kiện</Title>

      <Row gutter={[24, 24]}>
        {news.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              style={{ height: "100%" }}
            >
              <Title level={5}>{item.title}</Title>
              <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
              <Text type="secondary">
                Ngày đăng: {new Date(item.date).toLocaleDateString("vi-VN")}
              </Text>
              <div style={{ marginTop: 12 }}>
                <Button type="link" href={`/news/${item.id}`}>
                  Xem chi tiết
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewsPage;
