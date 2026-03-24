import React from 'react';
import { CheckCircle, Home, Mail } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="status-page container" style={{ paddingTop: '150px', textAlign: 'center' }}>
      <CheckCircle size={80} color="#C18C5D" style={{ marginBottom: '20px' }} />
      <h1 className="section-title">Booking Confirmed!</h1>
      <p className="lead">Thank you for choosing The Oikos Hotel.</p>
      <p style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
        A confirmation email has been sent to your address. We look forward to welcoming you to Pontian!
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <a href="/" className="btn btn-primary">
          <Home size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Return Home
        </a>
        <a href="mailto:info@theoikoshotel.com.my" className="btn btn-secondary">
          <Mail size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Contact Us
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
