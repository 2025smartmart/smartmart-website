import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    isFeatured: false,
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/categories');
        setCategories(res.data); // Assuming response like { categories: [...] }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setProduct({ ...product, image: files[0] });
    } else if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('isFeatured', product.isFeatured);
      formData.append('image', product.image);

      const res = await axios.post('http://localhost:5000/api/products/add-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Product added successfully!');
      // Clear the form
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        isFeatured: false,
      });
    } catch (err) {
      console.error('Error adding product:', err);
      alert(err.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm mt-4">
      <h4>Add New Product</h4>

      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Product Name"
        required
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Product Description"
        required
      />

      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Price"
        required
      />

      {/* Category Dropdown */}
      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="form-control mb-2"
        required
      >
        <option value="">-- Select Category </option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="isFeatured"
          checked={product.isFeatured}
          onChange={handleChange}
          id="isFeaturedCheck"
        />
        <label className="form-check-label" htmlFor="isFeaturedCheck">
          Is Featured?
        </label>
      </div>

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="form-control mb-3"
        required
      />

      <button className="btn btn-success">Add Product</button>
    </form>
  );
};

export default AddProductForm;



