import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, message } from "antd";
import { getAllNews } from "../../api/newsApi"; // Đường dẫn này thay đổi nếu bạn lưu file khác

const { Title, Paragraph, Text } = Typography;

const NewsPage = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const data = await getAllNews();
      setNews(data);
    } catch (error) {
      console.error(error);
      message.error("Không thể tải tin tức");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
      <Title level={2}>Tin Tức & Sự Kiện</Title>

      <Row gutter={[24, 24]}>
        {news.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                item.image && (
                  <div style={{ height: 200, overflow: "hidden" }}>
                    <img
                      alt={item.title}
                      src={item.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )
              }
              style={{ height: "100%" }}
            >
              <Title level={5}>{item.title}</Title>
              <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
              <Text type="secondary">
                Ngày đăng:{" "}
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString("vi-VN")
                  : "Chưa công bố"}
              </Text>
              <div style={{ marginTop: 12 }}>
                <Button type="link" href={`/news/${item._id}`}>
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
