import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>Ối! Trang này không tồn tại nữa.</h1>
      <p>
        Trang bạn đang tìm kiếm không còn tồn tại hoặc đã bị di chuyển. Hãy trở
        về{" "}
        <Link to="/" className="text-primary">
          Trang chủ
        </Link>
      </p>
    </>
  );
};

export default NotFoundPage;
