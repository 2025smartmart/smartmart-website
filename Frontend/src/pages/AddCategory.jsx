import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/add-category', { name });
      alert('Category added!');
    } catch {
      alert('Failed');
    }
  };

  return (
    <div>
      <h3>Add Category</h3>
      <input
        type="text"
        className="form-control w-50 mb-2"
        placeholder="Category name"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddCategory;
