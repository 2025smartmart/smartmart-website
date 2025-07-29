import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center text-danger mb-5">Contact Us</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>

              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input type="text" className="form-control" id="subject" placeholder="Subject" />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..." required></textarea>
              </div>

              <button type="submit" className="btn btn-danger w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
