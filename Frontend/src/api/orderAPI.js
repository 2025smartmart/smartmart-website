import axios from 'axios';

export const placeOrder = async (orderData) => {
  const res = await axios.post('http://localhost:5000/api/orders/place', orderData);
  return res.data;
};

export const getUserOrders = async (userId) => {
  const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
  return res.data.orders;
};


