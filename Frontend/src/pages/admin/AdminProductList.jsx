import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const res = await axios.get(`http://localhost:5000/api/admin/products?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary">All Products</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center gap-2 mt-3">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
