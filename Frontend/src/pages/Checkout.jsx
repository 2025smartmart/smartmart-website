import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.css'; // Optional: for extra custom styling if needed

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const checkoutProduct = JSON.parse(localStorage.getItem("checkoutProduct"));
  const itemsToCheckout = checkoutProduct
    ? [{ ...checkoutProduct, quantity: 1 }]
    : cartItems;

  const totalAmount = itemsToCheckout.reduce((sum, item) => {
    const priceAfterDiscount =
      item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
    return sum + priceAfterDiscount * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    const orderData = {
      cartItems: itemsToCheckout,
      shippingInfo: formData,
      totalAmount,
    };

    console.log("Order Placed:", orderData);

    localStorage.removeItem("cartItems");
    localStorage.removeItem("checkoutProduct");

    alert("Order placed successfully!");
    navigate("/order-success");
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <div className="row g-4">
        {/* Shipping Details */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Shipping Information</h4>
            <form>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                className="form-control mb-3"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Street Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="ZIP"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Order Summary</h4>
            <ul className="list-group mb-3">
              {itemsToCheckout.map((item, index) => {
                const priceAfterDiscount =
                  item.discount > 0
                    ? item.price * (1 - item.discount / 100)
                    : item.price;
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60x60?text=No+Image";
                        }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <span>₹{(priceAfterDiscount * item.quantity).toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



