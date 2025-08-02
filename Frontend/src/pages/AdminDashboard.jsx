import React from 'react';
import Sidebar from './sidebar';  // ✅ make sure the path is correct
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
