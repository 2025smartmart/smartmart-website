import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState([]);

  // 🔹 Load Shipping Address
  const loadAddress = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-address", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (data.success) {
        setAddress(data.address);
      }
    } catch (err) {
      console.error("Error loading address:", err);
    }
  };

  // 🔹 Load Orders
  const loadOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') loadOrders();
    if (activeTab === 'address') loadAddress();
  }, [activeTab]);

  // 🔹 Handle Address Save
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/update-address",
        { address },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.success) toast.success("Address updated!");
    } catch (err) {
      toast.error("Failed to update address");
    }
  };

  if (!user) return <h4>Loading...</h4>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">User Dashboard</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'info' && 'active'}`} onClick={() => setActiveTab('info')}>
            Profile Info
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'orders' && 'active'}`} onClick={() => setActiveTab('orders')}>
            Order History
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'address' && 'active'}`} onClick={() => setActiveTab('address')}>
            Shipping Address
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
                    Order #{order._id} - Total: ₹{order.totalAmount || "N/A"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'address' && (
          <div>
            <h5>Shipping Address</h5>
            <form onSubmit={handleSaveAddress}>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success">Save Address</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;


