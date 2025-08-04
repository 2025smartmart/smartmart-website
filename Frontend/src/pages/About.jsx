import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SmartMartLogo = () => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <h2 className="logo-container">
        <span className="logo-smart">SMART</span>
        <span className="logo-mart">MART</span>
      </h2>

      <style>
        {`
          .logo-container {
            font-size: 2rem;
            font-weight: bold;
            font-family: 'Segoe UI', sans-serif;
            border-radius: 8px;
            overflow: hidden;
          }

          .logo-smart {
            background-color: red;
            color: white;
            padding: 6px 12px;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }

          .logo-mart {
            background-color: red;
            color: white;
            padding: 6px 12px;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            border-left: 2px solid red;
          }
        `}
      </style>
    </div>
  );
};

const About = () => {
  return (
    <section
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(135deg, #f6d5d5 0%, #e0e0e0 100%)',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-5 text-center"
        style={{ maxWidth: '750px' }}
      >
        {/* Logo at the top */}
        <SmartMartLogo />

        <h1 className="display-5 fw-bold mb-4 text-black">
          Welcome to <strong className="text-black">SMART MART</strong>
        </h1>

        <p className="fst-italic fs-4 text-secondary mb-4">
          “<strong className="text-black">SMART MART</strong> — Smart shopping made simple, convenient, and delightful.”
        </p>

        <p className="fs-5 text-black">
          At <strong className="text-black">SMART MART</strong>, we are dedicated to bringing you the best products with unbeatable prices.
          Our mission is to make your shopping experience smooth, secure, and joyful.
        </p>

        <p className="fs-5 text-black">
          We bring you top-quality electronics including <strong>mobiles <span className="animated-emoji bounce">📱</span></strong>, <strong>laptops <span className="animated-emoji bounce">💻</span></strong>, <strong>earbuds <span className="animated-emoji bounce">🎧</span></strong>, <strong>smartwatches <span className="animated-emoji bounce">⌚</span></strong>, and <strong>speakers <span className="animated-emoji bounce">🔊</span></strong>.
          Our goal is to make online gadget shopping{' '}
          <span className="fw-semibold text-black">simple</span>,{' '}
          <span className="fw-semibold text-black">secure</span>, and{' '}
          <span className="fw-semibold text-black">affordable</span>. <strong className="text-black">SMART MART</strong> has got you covered with quality and trust.
        </p>

        <hr className="my-4" />

        <p className="fs-5 fw-semibold text-black">
          <span className="animated-emoji bounce">🛒</span>{' '}
          <span className="animated-emoji bounce">📦</span>{' '}
          Ready to shop? <br /> Come and explore great deals on our website today!
        </p>

        <p className="fs-5 text-black mt-3">
          <strong className="text-black">SMART MART</strong> was created by passionate tech lovers who wanted to offer something better. We care about product quality, customer trust, and fast delivery.
        </p>

        <p className="fs-5 text-black">
          <span className="animated-emoji bounce">💬</span>{' '}
          Thank you for choosing us — we're always here to serve you better!
        </p>

        <div className="border-top mt-4 pt-3">
          <span className="fw-bold fs-6 text-black">
            <span className="animated-emoji sparkle">✨</span>{' '}
            <span className="animated-emoji bounce">😀</span>{' '}
            — The <strong className="text-black">SMART MART</strong> Team
          </span>
        </div>
      </div>

      {/* Emoji Animations */}
      <style>
        {`
          .animated-emoji {
            display: inline-block;
          }

          .bounce {
            animation: bounce 1.5s infinite;
          }

          .sparkle {
            animation: sparkle 2s infinite;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes sparkle {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.3); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </section>
  );
};

export default About;