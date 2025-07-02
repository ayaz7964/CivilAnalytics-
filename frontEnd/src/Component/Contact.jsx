import React, { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../Css/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Improved validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.message.trim()) {
      setError("Please enter your message.");
      return;
    }
    if (form.message.trim().length < 10) {
      setError("Message must be at least 10 characters.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate loading
    setTimeout(() => {
      window.location.href = `mailto:ayazhussain4483@gmail.com?subject=Contact from ${encodeURIComponent(
        form.name
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      setIsSubmitting(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="hero-icon">
            <Mail className="icon" />
          </div>
          <h1>
            Contact <span className="brand-text">SatisNation</span>
          </h1>
          <p className="hero-description">
            We'd love to hear from you! Please fill out the form below and our
            team will get back to you soon.
          </p>
        </div>

        {/* Contact Form */}
        <div className="form-card">
          <div className="form-header">
            <h2>Send us a message</h2>
            <p>Fill out the form below and we'll get back to you soon.</p>
          </div>

          <div className="form-content">
            {/* Name Field */}
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <div className="input-wrapper">
                <User
                  className={`input-icon ${
                    focusedField === "name" ? "focused" : ""
                  }`}
                />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your full name"
                  className={`form-input ${
                    focusedField === "name" ? "focused" : ""
                  }`}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="input-wrapper">
                <Mail
                  className={`input-icon ${
                    focusedField === "email" ? "focused" : ""
                  }`}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="your@email.com"
                  className={`form-input ${
                    focusedField === "email" ? "focused" : ""
                  }`}
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="field-group">
              <label className="field-label">Message</label>
              <div className="input-wrapper">
                <MessageSquare
                  className={`input-icon textarea-icon ${
                    focusedField === "message" ? "focused" : ""
                  }`}
                />
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Ask us anything"
                  rows={6}
                  className={`form-input form-textarea ${
                    focusedField === "message" ? "focused" : ""
                  }`}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="message error-message">
                <AlertCircle className="message-icon" />
                <p>{error}</p>
              </div>
            )}

            {/* Success Message */}
            {sent && (
              <div className="message success-message">
                <CheckCircle className="message-icon" />
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="btn-icon" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
