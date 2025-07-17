import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ content: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchComments = async () => {
    try {
      const res = await getCommentsByProductId(productId);
      setComments(res.data);
    } catch (error) {
      console.error("Lỗi khi tải bình luận:", error);
    }
  };

  useEffect(() => {
    if (productId) fetchComments();
  }, [productId]);

  const handleChange = (e) => {
    setForm({ ...form, content: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Bạn phải đăng nhập để bình luận!");
    if (!form.content.trim()) return alert("Vui lòng nhập nội dung bình luận.");
    if (rating === 0) return alert("Vui lòng chọn số sao đánh giá.");

    try {
      await createComment(
        {
          productId,
          userId: user._id,
          author: user.fullname,
          content: form.content,
          rating,
        },
        user.token
      );
      setForm({ content: "" });
      setRating(0);
      fetchComments();
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  return (
    <div className="mt-5">
      <h4>Bình luận</h4>

      <form onSubmit={handleSubmit} className="mb-4">
        {user ? (
          <>
            <div className="mb-2">
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Nhập bình luận..."
              ></textarea>
            </div>

            <div className="mb-3">
              {[...Array(5)].map((_, index) => {
                const current = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={current}
                      onClick={() => setRating(current)}
                      className="d-none"
                    />
                    <FaStar
                      color={
                        current <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={24}
                      onMouseEnter={() => setHover(current)}
                      onMouseLeave={() => setHover(null)}
                      style={{ cursor: "pointer", marginRight: 4 }}
                    />
                  </label>
                );
              })}
            </div>

            <button className="btn btn-primary" type="submit">
              Gửi bình luận
            </button>
          </>
        ) : (
          <p className="text-danger">Vui lòng đăng nhập để bình luận.</p>
        )}
      </form>

      {comments.length === 0 ? (
        <p>Chưa có bình luận nào.</p>
      ) : (
        <ul className="list-group">
          {comments.map((comment) => (
            <li key={comment._id} className="list-group-item">
              <strong>{comment.author}</strong>
              <div>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < comment.rating ? "#ffc107" : "#e4e5e9"}
                    size={16}
                  />
                ))}
              </div>
              <div>{comment.content}</div>
              <small className="text-muted">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
