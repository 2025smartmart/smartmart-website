// src/pages/OrderSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h2 className="text-danger mb-3">No order details found</h2>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    );
  }

  const { cartItems, orderId, paymentId, amount } = state;

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-5 text-center">
          <div
            className="mb-4"
            style={{
              fontSize: "60px",
              color: "#28a745",
            }}
            aria-label="Success Icon"
          >
            ✔️
          </div>

          <h1 className="card-title mb-3 fw-bold" style={{ color: "#2d3748" }}>
            Payment Successful 🎉
          </h1>
          <p className="text-muted mb-1">
            <strong>Order ID:</strong>{" "}
            <span className="text-break text-secondary">{orderId}</span>
          </p>
          <p className="text-muted mb-3">
            <strong>Payment ID:</strong>{" "}
            <span className="text-break text-secondary">{paymentId}</span>
          </p>
          <h4 className="fw-bold text-success mb-4">Total Paid: ₹{amount}</h4>

          <h5 className="text-start mb-3">Items Purchased:</h5>
          <ul className="list-group mb-4 shadow-sm rounded">
            {cartItems?.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image}`
                  }
                  alt={item.name}
                  className="rounded"
                  style={{ width: "64px", height: "64px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/64?text=No+Image")
                  }
                />
                <div className="flex-grow-1">
                  <p className="mb-1 fw-semibold text-dark">{item.name}</p>
                  <small className="text-muted">
                    ₹{item.price} × {item.quantity || 1}
                  </small>
                </div>
                <div className="fw-bold">
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="btn btn-lg btn-success text-white fw-semibold px-5"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;


