import React, { useState } from 'react';
import { api } from '../api';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    query_subject: '',
    query_message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.user_email.trim()) {
      alert('Email is required');
      return;
    }
    if (!formData.query_message.trim()) {
      alert('Query message is required');
      return;
    }
    if (!formData.user_email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await api.submitQuery(formData);
      setSubmitted(true);
      setFormData({
        user_name: '',
        user_email: '',
        query_subject: '',
        query_message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Error submitting query: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-icon">
          <i className="bi bi-chat-dots"></i>
        </div>
        <h1>Contact Us</h1>
        <p>Have a question or feedback? We'd love to hear from you!</p>
      </div>

      {/* Contact Form Section */}
      <div style={{maxWidth: '600px', margin: '30px auto'}}>
        {submitted && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <i className="bi bi-check-circle" style={{fontSize: '1.2rem'}}></i>
            <span><strong>Thank you!</strong> Your query has been submitted successfully. We'll get back to you soon.</span>
          </div>
        )}

        <div className="search-form">
          <h3 style={{marginBottom: '25px', color: '#2d3436', fontWeight: 700}}>Send us your query</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="user_name">
                <i className="bi bi-person" style={{color: '#d63031', marginRight: '6px'}}></i>
                Name (Optional)
              </label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                className="input"
                placeholder="Your name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="user_email">
                <i className="bi bi-envelope" style={{color: '#d63031', marginRight: '6px'}}></i>
                Email <span style={{color: '#d63031'}}>*</span>
              </label>
              <input
                id="user_email"
                type="email"
                name="user_email"
                className="input"
                placeholder="your.email@example.com"
                value={formData.user_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="query_subject">
                <i className="bi bi-chat-left-text" style={{color: '#d63031', marginRight: '6px'}}></i>
                Subject (Optional)
              </label>
              <input
                id="query_subject"
                type="text"
                name="query_subject"
                className="input"
                placeholder="Query subject"
                value={formData.query_subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="query_message">
                <i className="bi bi-pencil-square" style={{color: '#d63031', marginRight: '6px'}}></i>
                Your Query <span style={{color: '#d63031'}}>*</span>
              </label>
              <textarea
                id="query_message"
                name="query_message"
                className="input"
                placeholder="Tell us your query or feedback..."
                value={formData.query_message}
                onChange={handleChange}
                rows="6"
                required
                style={{resize: 'vertical', fontFamily: 'inherit'}}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{width: '100%', marginTop: '10px'}}
            >
              <i className="bi bi-send"></i> {loading ? 'Submitting...' : 'Submit Query'}
            </button>
          </form>
        </div>

        <div style={{
          background: '#e7f3ff',
          border: '1px solid #b3d9ff',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px',
          color: '#004085'
        }}>
          <p style={{marginBottom: '10px', fontWeight: 600}}>
            <i className="bi bi-info-circle" style={{marginRight: '8px', color: '#d63031'}}></i>
            What happens after you submit?
          </p>
          <ul style={{margin: '0', paddingLeft: '20px'}}>
            <li>Your query will be received by our support team</li>
            <li>We'll review it and get back to you within 24 hours</li>
            <li>You can track responses via the email you provided</li>
          </ul>
        </div>
      </div>
    </>
  );
}
