import React from 'react';

const SmartMartLogo = () => {
  return (
    <div style={{
      display: 'inline-block',
      backgroundColor: 'red',
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      lineHeight: '1.1',
      textAlign: 'center',
      userSelect: 'none',
      width: '60px',
      margin: '1rem auto',
      position: 'relative',
      boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
      cursor: 'default',
    }}>
      SMART <br /> MART{' '}
      <span
        role="img"
        aria-label="sparkles"
        style={{
          display: 'inline-block',
          marginLeft: '4px',
          animation: 'bounce 1.5s infinite',
        }}
      >
        ✨
      </span>{' '}
      <span
        role="img"
        aria-label="happy"
        style={{
          display: 'inline-block',
          marginLeft: '2px',
          animation: 'bounce 1.5s infinite',
          animationDelay: '0.3s',
        }}
      >
        😀
      </span>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

const About = () => {
  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Welcome to, <strong>SMART MART</strong>
        </h1>

        {/* Logo inserted here */}
        <SmartMartLogo />

        <p style={styles.quote}>
          “SMART MART — Smart shopping made simple, convenient, and delightful.”
        </p>

        <p style={styles.message}>
          At <strong>SMART MART</strong>, we are dedicated to bringing you the best products with unbeatable prices.  
          Our mission is to make your shopping experience smooth, secure, and joyful.
        </p>

        <p style={styles.message}>
          We bring you top-quality electronics including <strong>mobiles</strong>, <strong>laptops</strong>, <strong>earbuds</strong>, <strong>headsets</strong>, <strong>smartwatches</strong>, and <strong>speakers</strong>.
          Our goal is to make online gadget shopping <span style={{ color: '#7e22ce' }}>simple</span>, <span style={{ color: '#7e22ce' }}>secure</span>, and <span style={{ color: '#7e22ce' }}>affordable</span>. SMART MART has got you covered with quality and trust.
        </p>

        <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.8' }}>
          <strong> SMART MART</strong> was created by passionate tech lovers who wanted to offer something better. We care about product quality, customer trust, and fast delivery.
        </p>

        <p style={{ fontSize: '18px', color: '#444', lineHeight: '1.8' }}>
          💬 Thank you for choosing us – we're always here to serve you better!
        </p>

        <div style={styles.footer}>
          <span style={styles.signature}>— The <strong> SMART MART</strong> Team</span>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderRadius: '15px',
    padding: '3rem 2.5rem',
    maxWidth: '600px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1.2rem',
    color: '#3a1053',
    fontWeight: '700',
    letterSpacing: '3px',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '1.4rem',
    color: '#764ba2',
    marginBottom: '2rem',
  },
  message: {
    fontSize: '1.1rem',
    color: '#444',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  footer: {
    marginTop: '2.5rem',
  },
  signature: {
    fontWeight: '700',
    color: '#667eea',
    fontSize: '1.2rem',
  },
};

export default About;