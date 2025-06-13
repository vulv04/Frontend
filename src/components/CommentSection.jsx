import React, { useEffect, useState } from "react";
import { createComment, getCommentsByProductId } from "../api/comment";

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ content: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("👤 USER localStorage:", user);


  const fetchComments = async () => {
    try {
      const res = await getCommentsByProductId(productId); // ✔ Đúng API
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

    try {
        await createComment(
          {
            productId,
            userId: user.id,
            author: "Anonymous",
            content: form.content,
          },
          user.token // thêm token nếu cần xác thực
        );
      setForm({ content: "" });
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
              <strong>{comment.author}</strong> <br />
              <span>{comment.content}</span> <br />
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
