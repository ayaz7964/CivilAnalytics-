import React, { useState, useEffect } from "react";
import { useUser } from "../User/UserContext";
import "../Css/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const { dispatch } = useUser();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.user) {
        dispatch({
          type: "LOGIN",
          payload: {
            email: data.user.email,
            username: data.user.username,
          },
        });
        // Redirect to dashboard or homepage
        // window.location.href = "/dashboard";
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(
        "Unable to connect to server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back! 👋</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="identifier">Email or Username</label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
              placeholder="Enter your email or username"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <div className="show-password">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                disabled={loading}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
          </div>

          {error && (
            <div className="error-msg" role="alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="login-actions">
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* <div className="forgot-password">
              <a href="/forgot-password">Forgot your password?</a>
            </div> */}
          </div>
        </form>

        <div className="login-footer">
          <p className="signup-redirect">
            {/* Don't have an account? <a href="/signup">Create Account</a>
             */}
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
