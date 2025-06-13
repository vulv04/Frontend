import React from "react";
import { useParams, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu chưa login, hoặc id không trùng với user hiện tại, redirect về login hoặc trang khác
  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          You need to login to view this profile.
        </div>
      </div>
    );
  }

  if (user.id.toString() !== id) {
    return <Navigate to="/" replace />; // hoặc redirect về trang nào bạn muốn
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          <h4 className="card-title">{user.username}</h4>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text text-muted">User ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
