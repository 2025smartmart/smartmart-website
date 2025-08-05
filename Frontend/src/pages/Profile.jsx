import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [orders, setOrders] = useState([]);

  // 🔹 Load Orders
  const loadOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') loadOrders();
  }, [activeTab]);

  if (!user) return <h4>Loading...</h4>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">User Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'info' && 'active'}`}
            onClick={() => setActiveTab('info')}
          >
            Profile Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'orders' && 'active'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card p-4 shadow-sm">
        {activeTab === 'info' && (
          <div>
            <h5>Welcome, {user.name}</h5>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h5>Your Orders</h5>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="list-group">
                {orders.map((order, index) => (
                  <li key={index} className="list-group-item">
                    Order #{order._id} – Total: ₹{order.totalAmount}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;




