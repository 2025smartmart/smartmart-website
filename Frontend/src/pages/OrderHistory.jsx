import React, { useEffect, useState } from 'react';
import { Card, Spinner, Table } from 'react-bootstrap';
import { getUserOrders } from '../api/orderAPI';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userOrders = await getUserOrders(user._id);
        setOrders(userOrders);
      } catch (err) {
        console.error('Error loading orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      loadOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center my-4">
        <h5>You haven’t placed any orders yet.</h5>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-4">🧾 Order History</h4>
      {orders.map((order, idx) => (
        <Card key={order._id || idx} className="mb-4 shadow-sm">
          <Card.Header>
            <strong>Order ID:</strong> {order._id} <br />
            <small>Placed on: {new Date(order.createdAt).toLocaleDateString()}</small>
          </Card.Header>
          <Card.Body>
            <Table responsive bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
              <strong>Total: ₹{order.totalAmount}</strong>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;

