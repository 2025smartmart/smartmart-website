import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // ✅ Token from context

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('image', image);

    try {
      setLoading(true);

      const token = user?.token || localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/admin/add-product',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('✅ Product added successfully!');
        setProduct({ name: '', description: '', price: '', category: '' });
        setImage(null);
      } else {
        toast.error(res.data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Axios Error:', err.response?.data || err.message);
      toast.error('❌ Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
      <h4 className="mb-3">Add Product</h4>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="form-control mb-3"
        rows="3"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <input
        type="file"
        onChange={handleFile}
        className="form-control mb-4"
        accept="image/*"
        required
      />

      <button type="submit" className="btn btn-success w-100" disabled={loading}>
        {loading ? 'Uploading...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProduct;



