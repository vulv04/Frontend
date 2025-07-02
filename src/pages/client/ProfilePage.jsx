import React from "react";
import { useParams, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams(); // ✅ Dùng đúng tên param
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user._id) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          You need to login to view this profile.
          
        </div>
      </div>
    );
  }

  if (user._id.toString() !== id.toString()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.username || "User"
            )}&background=random`}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          <h3 className="card-title">{user.username}</h3>
          <p className="card-text">Full Name: {user.fullname}</p>
          <p className="card-text">Role: {user.role || "User"}</p>
          <p className="card-text">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
