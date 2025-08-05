import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";



const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
        console.log("Search API response:", res.data);
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
   <div className="container mt-4">
  <h2 className="mb-4">Search Results for: "{query}"</h2>
  <div className="row">
    {results.length > 0 ? (
      results.map((product) => (
        <div className="col-md-3 mb-4" key={product._id}>
          <div className="card h-100 shadow-sm border-0">
            <img
  src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.name}
  className="card-img-top"
  style={{ objectFit: "cover", height: "200px" }}
  onError={(e) => { e.target.src = "/default-image.jpg"; }}
/>

            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-dark">{product.name}</h5>
              <p className="card-text text-success mt-auto fw-bold">₹{product.price}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products found.</p>
    )}
  </div>
</div>

  );
};

export default SearchResults;

