import React, { useState } from 'react';
import axios from 'axios';

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/products/add-category', { name });
      setSuccessMsg('✅ Category added successfully!');
      setName('');
    } catch (err) {
      const message = err.response?.data?.message || '❌ Failed to add category';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
      <h4 className="mb-3">Add New Category</h4>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Category'}
      </button>
    </form>
  );
};

export default AddCategoryForm;

