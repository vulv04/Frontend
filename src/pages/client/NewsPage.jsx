import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, message, Spin, Empty } from "antd";
import { getAllNews } from "../../api/newsApi";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews();
      console.log(data.data);
      setNews(data.data || []);
    } catch (error) {
      console.error(error);
      message.error("Không thể tải tin tức");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
      <Title level={2}>Tin Tức & Sự Kiện</Title>

      {loading ? (
        <Spin style={{ display: "block", margin: "50px auto" }} />
      ) : news.length === 0 ? (
        <Empty description="Chưa có tin tức nào" style={{ marginTop: 50 }} />
      ) : (
        <Row gutter={[24, 24]}>
          {news.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={
                  <div style={{ height: 200, overflow: "hidden" }}>
                    <img
                      alt={item.title || "Tin tức"}
                      src={item.image || "/no-image.jpg"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                }
                style={{ height: "100%" }}
              >
                <Title level={5} style={{ minHeight: 50 }}>
                  {item.title || "Không có tiêu đề"}
                </Title>
                <Paragraph ellipsis={{ rows: 2 }}>
                  {item.conten || "Không có nôi dung"}
                </Paragraph>
                <Text
                  type="secondary"
                  style={{ display: "block", marginBottom: 8 }}
                >
                  Ngày đăng:{" "}
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString("vi-VN")
                    : "Chưa công bố"}
                </Text>
                <Link to={`/news/${item.slug || item._id}`}>
                  <Button type="link">Xem chi tiết</Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default NewsPage;
