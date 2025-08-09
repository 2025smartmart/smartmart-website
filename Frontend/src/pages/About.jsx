import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import banner from '../assets/gadgets.jpg'

const AboutUs = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Single Image */}
          <Col md={6}>
            <div className="mb-3">
              <img
  src={banner} // ✅ No quotes
  alt="gadgets"
  className="img-fluid rounded shadow-sm"
  style={{ maxWidth: "100%", height: "auto" }}
/>

            </div>
          </Col>

          {/* Right Side - Text */}
          <Col md={6}>
            {/* Smaller SMART MART */}
            <div
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1.2rem",
                letterSpacing: "2px",
              }}
            >
              SMART MART
            </div>

            <h1 className="fw-bold mt-3">ABOUT US</h1>

            {/* Simple intro */}
            <p style={{ lineHeight: "1.6" }}>
              Welcome to <strong>SmartMart</strong>, your trusted shopping app delivering quality products and exceptional service right at your fingertips.
            </p>

            {/* Professional, trustworthy product lines */}
            <p style={{ lineHeight: "1.6" }}>
              Our curated selection of mobiles combines the latest technology with reliable performance to keep you connected. <br />
              Discover stylish watches that blend elegance and functionality for every occasion. <br />
              Explore powerful laptops designed to boost productivity and entertainment. <br />
              Experience premium sound quality with our range of earphones, crafted for comfort and clarity. <br />
              Enhance your environment with speakers that deliver immersive audio experiences. <br />
              At SmartMart, we prioritize your satisfaction through quality, value, and trust in every purchase.
            </p>

            <Button
              href="https://your-smart-smart-website-link.com" // Replace with your actual link
              variant="danger" // red background
              className="fw-bold text-white px-4 py-2"
            >
              EXPLORE MORE
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;