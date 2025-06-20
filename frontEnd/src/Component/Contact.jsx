import React, { useState } from 'react';
import '../Css/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // This uses mailto for demo. For production, use a backend/email service.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    window.location.href = `mailto:ayazhussain4483@gmail.com?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    setSent(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Contact <span className="brand">CiviAnalytics</span></h1>
        <p className="contact-tagline">
          We'd love to hear from you! Please fill out the form below and our team will get back to you soon.
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </label>
        <label>
          Message
          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="Type your message here..."
            rows={5}
            required
          />
        </label>
        {error && <div className="contact-error">{error}</div>}
        <button className="contact-btn" type="submit">Send Message</button>
        {sent && (
          <div className="contact-success">
            Thank you for reaching out! Your message has been sent.
          </div>
        )}
      </form>
      <div className="contact-info">
        <h3>Or email us directly:</h3>
        <a href="mailto:ayazhussain4483@gmail.com" className="contact-email">ayazhussain4483@gmail.com</a>
      </div>
    </div>
  );
}