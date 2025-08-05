// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty </h4>
          <Link to="/shop" className="btn btn-primary mt-3">Continue Shopping</Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items Table */}
          <div className="col-lg-8 mb-4">
            <Table responsive bordered hover className="text-center align-middle">
              <thead>
                <tr className="bg-light">
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price.toLocaleString()}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <Button size="sm" variant="outline-secondary" onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>−</Button>
                        <span>{item.quantity}</span>
                        <Button size="sm" variant="outline-secondary" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</Button>
                      </div>
                    </td>
                    <td>₹{(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Summary Section */}
          <div className="col-lg-4">
            <div className="border rounded p-4 bg-light shadow-sm">
              <h4>Cart Summary</h4>
              <hr />
              <p><strong>Subtotal:</strong> ₹{subtotal.toLocaleString()}</p>
              <p><strong>Shipping:</strong> Free</p>
              <p><strong>Total:</strong> ₹{subtotal.toLocaleString()}</p>
            
                <Link to="/checkout" className="btn btn-success w-100 mt-3">
                    Proceed to Checkout
                </Link>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

