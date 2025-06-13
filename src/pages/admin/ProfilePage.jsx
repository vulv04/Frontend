import React from "react";

const users = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    role: "User",
    status: "Active",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "+84 987 654 321",
    address: "456 Đường XYZ, Quận 3, TP. HCM",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 3,
    fullName: "Lê Văn C",
    email: "levanc@example.com",
    phone: "+84 555 666 777",
    address: "789 Đường DEF, Quận 5, TP. HCM",
    role: "User",
    status: "Active",
  },
];

const ProfilePage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Danh sách người dùng</h2>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Địa chỉ</th>
              <th>Role</th>
              <th>Trạng thái</th>
              <th style={{ minWidth: "130px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có người dùng nào
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
