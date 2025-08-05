import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '../api/orderAPI'; // ✅ important

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: ''
  });

  const totalAmount = cartItems.reduce((sum, item) => {
    const priceAfterDiscount = item.discount > 0
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + priceAfterDiscount * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Validate
    const missingFields = Object.values(formData).some(field => field.trim() === '');
    if (missingFields) {
      toast.error('Please fill all billing fields!');
      return;
    }

    const orderData = {
  cartItems,
  shippingInfo: formData, // ✅ correctly passed
  totalAmount
};

try {
  const res = await placeOrder(orderData);
  toast.success(res.message || 'Order placed!');

  // Clear cart after success
  localStorage.removeItem('cartItems');

  // ✅ Pass order data to success page via state
  navigate('/order-success', {
    state: {
      orderId: res.orderId,
      order: res.order
    }
  });

} catch (err) {
  toast.error(err?.response?.data?.message || 'Order failed!');
}
}

  return (
    <Container className="py-5">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        {/* Billing Form */}
        <Col md={7}>
          <Card className="p-4 shadow-sm border-0">
            <h5 className="mb-3">Billing Information</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={5}>
          <Card className="p-4 shadow-sm border-0">
            <h5 className="mb-3">Order Summary</h5>
            {cartItems.map(item => (
              <div key={item._id} className="d-flex justify-content-between mb-3 border-bottom pb-2">
                <div>
                  <strong>{item.name}</strong> × {item.quantity}
                  <br />
                  <small>{item.category}</small>
                </div>
                <div>
                  ₹{((item.price * (1 - (item.discount || 0) / 100)) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3 fw-bold">
              <span>Total:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <Button className="w-100 mt-4" variant="success" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

