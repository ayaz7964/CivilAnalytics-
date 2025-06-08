import React, { useState, useEffect } from "react";
import { useUser } from "../User/UserContext";
import "../Css/SignUp.css"; // Reuse the same CSS as SignUp

export default function Login() {
  const { dispatch } = useUser();
  // Use 'identifier' instead of 'email' to allow email or username
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add showPassword state

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        // Save both email and username in context for later use
        dispatch({
  type: "LOGIN",
  payload: {
    email: data.user.email,
    username: data.user.username,
  },
});
console.log("User after login:", { email: data.user.email, username: data.user.username });
        // window.location.href = "/home"; // or use navigate if using react-router
        // window.location.href = "/dashboard";
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="signup-bg">
      <div className="signup-card">
        <div className="signup-image-section">
          <img src="/login-illustration.jpg" alt="Login" className="signup-image" />
        </div>
        <div className="signup-form-section">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="identifier">Email or Username</label>
              <input
                type="text"
                name="identifier"
                id="identifier"
                value={form.identifier}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <div style={{ marginTop: "0.5em" }}>
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="showPassword" style={{ marginLeft: "0.5em" }}>
                  Show Password
                </label>
              </div>
            </div>
            {error && <div className="server-error">{error}</div>}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="login-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}