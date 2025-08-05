import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn btn-outline-light">
        Search
      </button>
    </form>
  );
};

export default SearchBox;


