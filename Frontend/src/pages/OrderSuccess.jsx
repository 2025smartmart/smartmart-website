import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const order = location.state?.order;

  return (
    <Container className="py-5">
      <Card className="p-5 shadow-sm text-center">
        <h2 className="text-success mb-4">🎉 Order Placed Successfully!</h2>
        {orderId ? (
          <>
            <p>Your order ID is: <strong>{orderId}</strong></p>
            <p>Thank you for your purchase!</p>

            {/* Show Order Items */}
            {order?.cartItems?.length > 0 && (
              <div className="mt-4 text-start">
                <h5 className="mb-3">Your Items:</h5>
                {order.cartItems.map((item) => (
                  <div key={item._id} className="mb-2">
                    <strong>{item.name}</strong> × {item.quantity} – ₹{item.price}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Thank you for your purchase!</p>
        )}

        <div className="mt-4">
          <Link to="/orders" className="btn btn-outline-primary me-3">View My Orders</Link>
          <Link to="/" className="btn btn-success">Continue Shopping</Link>
        </div>
      </Card>
    </Container>
  );
};

export default OrderSuccess;
