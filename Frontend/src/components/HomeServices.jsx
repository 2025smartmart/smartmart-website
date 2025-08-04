import React from 'react';
import './HomeServices.css'

const services = [
  {
    icon: 'bi-truck',
    title: 'Free Delivery',
    desc: 'On orders over ₹999',
    color: '#FFA500',
    bgColor: 'rgba(255, 165, 0, 0.1)'
  },
  {
    icon: 'bi-arrow-counterclockwise',
    title: 'Easy Returns',
    desc: '7-day return policy',
    color: '#28A745',
    bgColor: 'rgba(40, 167, 69, 0.1)'
  },
  {
    icon: 'bi-patch-check-fill',
    title: 'Premium Quality',
    desc: 'Original products only',
    color: '#007BFF',
    bgColor: 'rgba(0, 123, 255, 0.1)'
  },
  {
    icon: 'bi-headset',
    title: '24/7 Support',
    desc: 'Always here to help',
    color: '#DC3545',
    bgColor: 'rgba(220, 53, 69, 0.1)'
  },
  {
    icon: 'bi-shield-lock',
    title: 'Secure Payment',
    desc: '100% safe & secure',
    color: '#17A2B8',
    bgColor: 'rgba(23, 162, 184, 0.1)'
  },
  {
    icon: 'bi-lightning-charge-fill',
    title: 'Fast Shipping',
    desc: 'Same day dispatch',
    color: '#FFC107',
    bgColor: 'rgba(255, 193, 7, 0.1)'
  },
];

const HomeServices = () => {
  return (
    <div className="container py-4">
      <div className="row g-4 justify-content-center">
        {services.map((service, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2">
            <div 
              className="service-card p-3 rounded-3 h-100 d-flex flex-column align-items-center text-center transition-all"
              style={{ backgroundColor: service.bgColor }}
            >
              <div 
                className="icon-wrapper mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: service.bgColor,
                  width: '60px',
                  height: '60px'
                }}
              >
                <i 
                  className={`bi ${service.icon} fs-4`}
                  style={{ color: service.color }}
                ></i>
              </div>
              <h6 className="fw-bold mb-2" style={{ color: '#2C3E50' }}>{service.title}</h6>
              <p className="small text-muted mb-0">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServices;

