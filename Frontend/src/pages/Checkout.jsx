// src/pages/Checkout.jsx
import React, { useRef, useState, useMemo, useEffect } from "react";
import PaymentPage from "../components/PaymentPage";
import "./Checkout.css"; // optional styling file

const Checkout = () => {
  const paymentRef = useRef(null);

  // Shipping form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Load cart items from localStorage once
  const cartItems = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch {
      return [];
    }
  }, []);

  // Load single checkout product from localStorage once
  const checkoutProduct = useMemo(() => {
    try {
      const cp = localStorage.getItem("checkoutProduct");
      return cp ? JSON.parse(cp) : null;
    } catch {
      return null;
    }
  }, []);

  // Determine the items to checkout: single product or cart items
  const itemsToCheckout = useMemo(() => {
    if (checkoutProduct) return [{ ...checkoutProduct, quantity: 1 }];
    return cartItems.length ? cartItems : [];
  }, [checkoutProduct, cartItems]);

  // Calculate total amount with discounts applied
  const totalAmount = useMemo(
    () =>
      itemsToCheckout.reduce((sum, item) => {
        const priceAfterDiscount =
          item.discount > 0
            ? item.price * (1 - item.discount / 100)
            : item.price;
        return sum + priceAfterDiscount * item.quantity;
      }, 0),
    [itemsToCheckout]
  );

  // Debug: Log items to checkout
  useEffect(() => {
    console.log("Items to checkout:", itemsToCheckout);
  }, [itemsToCheckout]);

  // Handle input field changes for shipping info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data completeness
  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (!String(value).trim()) {
        alert(`Please fill in your ${key}.`);
        return false;
      }
    }
    if (!itemsToCheckout.length) {
      alert("No items to checkout.");
      return false;
    }
    return true;
  };

  // Handle Place Order click: validate and trigger payment
  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    // Trigger payment via ref method (openPayment or startPayment)
    if (paymentRef.current?.openPayment) {
      paymentRef.current.openPayment(totalAmount);
    } else if (paymentRef.current?.startPayment) {
      paymentRef.current.startPayment(totalAmount);
    } else {
      alert("Payment component not ready. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <div className="row g-4">
        {/* Shipping Details */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Shipping Information</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
              <input
                type="tel"
                name="phone"
                className="form-control mb-3"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                autoComplete="tel"
              />
              <input
                type="text"
                name="address"
                className="form-control mb-3"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                autoComplete="street-address"
              />
              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                />
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  autoComplete="address-level1"
                />
                <input
                  type="text"
                  name="zip"
                  className="form-control"
                  placeholder="ZIP"
                  value={formData.zip}
                  onChange={handleInputChange}
                  autoComplete="postal-code"
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
              {itemsToCheckout.map((item, idx) => {
                const priceAfterDiscount =
                  item.discount > 0
                    ? item.price * (1 - item.discount / 100)
                    : item.price;

                // Construct image src
                const imgSrc = item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:5000${item.image}`
                  : "https://via.placeholder.com/60x60?text=No+Image";

                return (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={imgSrc}
                        alt={item.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/60x60?text=No+Image")
                        }
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

            <button
              className="btn btn-success w-100"
              onClick={handlePlaceOrder}
              disabled={itemsToCheckout.length === 0}
              type="button"
            >
              Place Order & Pay
            </button>

            {/* Payment component, hidden UI */}
            <PaymentPage
              ref={paymentRef}
              amount={totalAmount}
              product={itemsToCheckout.length === 1 ? itemsToCheckout[0] : null}
              billingDetails={formData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;







