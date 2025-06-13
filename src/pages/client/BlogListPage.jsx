import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import Breadcrumb from "../../components/Breadcrumb";

// Component thẻ bài viết blog
const BlogCard = ({ title, description, image, date }) => (
  <div className="card h-100 shadow-sm">
    <img
      src={image}
      className="card-img-top"
      alt={title}
      style={{ height: "180px", objectFit: "cover" }}
    />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{title}</h5>
      <p className="card-text text-truncate">{description}</p>
      <small className="text-muted mt-auto">
        {new Date(date).toLocaleDateString()}
      </small>
    </div>
  </div>
);

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProducts();
        const products = res.data.products || res.data;

        // Giả lập sản phẩm thành bài viết
        const blogPosts = products.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.thumbnail || p.images?.[0] || "",
          date: p.createdAt || new Date().toISOString(),
        }));

        setBlogs(blogPosts);
      } catch (err) {
        setError(err.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Xác định bài viết hiển thị theo trang
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container my-5">
      <div className="mb-3">
        <Breadcrumb items={[{ label: "Blog", link: "/blog" }]} />
      </div>
      <h1 className="mb-4 text-center">Bài Viết Mới Nhất</h1>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" />
          <p>Đang tải bài viết...</p>
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && blogs.length === 0 && (
        <p className="text-center">Không có bài viết nào.</p>
      )}

      <div className="row">
        {!loading &&
          !error &&
          currentBlogs.map(({ id, title, description, image, date }) => (
            <div key={id} className="col-md-4 mb-4">
              <BlogCard
                title={title}
                description={description}
                image={image}
                date={date}
              />
            </div>
          ))}
      </div>

      {/* Phân trang */}
      {!loading && !error && totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ cursor: "pointer" }}
            >
              <span className="page-link">Trước</span>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{i + 1}</span>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ cursor: "pointer" }}
            >
              <span className="page-link">Sau</span>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default BlogListPage;
