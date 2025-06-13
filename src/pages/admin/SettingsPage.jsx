import React from "react";

const SettingsPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Account Settings</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">Account Info</div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="+84 123 456 789"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="123 Đường ABC, Quận 1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">Security Settings</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" />
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">Notification Preferences</div>
        <div className="card-body">
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
            />
            <label className="form-check-label">Email Notifications</label>
          </div>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">SMS Notifications</label>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
            />
            <label className="form-check-label">Push Notifications</label>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">Appearance</div>
        <div className="card-body">
          <select className="form-select">
            <option>Light Mode</option>
            <option>Dark Mode</option>
            <option>System Default</option>
          </select>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header">Language Settings</div>
        <div className="card-body">
          <select className="form-select">
            <option>Tiếng Việt</option>
            <option>English</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary">Reset</button>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;
