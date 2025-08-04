import React from 'react';
import AddCategoryForm from '../components/AddCategoryForm';
import AddProductForm from '../components/AddProductForm';

const Dashboard = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">🛠 Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <AddCategoryForm />
        </div>
        <div className="col-md-6">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
