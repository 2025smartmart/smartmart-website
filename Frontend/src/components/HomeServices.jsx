import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaTools, FaTruck, FaSyncAlt, FaLock } from 'react-icons/fa';
import './HomeServices.css'

const services = [
  {
    icon: <FaTruck size={28} className="service-icon" />,
    title: 'Fast Delivery',
    description: 'Safe & quick delivery',
  },
  {
    icon: <FaSyncAlt size={28} className="service-icon" />,
    title: 'Easy Returns',
    description: '7-day return policy',
  },
  {
    icon: <FaTools size={28} className="service-icon" />,
    title: '24/7 Support',
    description: 'Always here for you',
  },
  {
    icon: <FaLock size={28} className="service-icon" />,
    title: 'Secure Payment',
    description: 'Encrypted & safe',
  },
];

const HomeServices = () => {
  return (
    <section className="py-4 bg-light">
      <Container fluid="lg">
        <Row className="g-3 justify-content-center">
          {services.map((service, index) => (
            <Col xs={6} md={3} key={index}>
              <Card className="text-center service-card h-100 border-0">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
                  <div className="mb-2">{service.icon}</div>
                  <Card.Title className="fw-bold mb-1">{service.title}</Card.Title>
                  <Card.Text className="text-muted small text-center mb-0">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HomeServices;





