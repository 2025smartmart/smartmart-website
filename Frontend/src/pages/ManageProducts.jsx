import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/products');
    setProducts(res.data.products);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/delete-product/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Manage Products</h3>
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Action</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
