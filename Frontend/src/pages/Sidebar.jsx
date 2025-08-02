import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ minWidth: '200px' }}>
      <h4 className="text-center">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-white" to="/admin-dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/add-product">Add Product</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/manage-products">Manage Products</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/add-category">Add Category</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
