import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Css/Login.css"; // Reusing login styles
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up - Your App Name";
  }, []);

  const formik = useFormik({
    initialValues: {
      Username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().min(2).required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setServerError("");
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.Username,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setServerError(data?.error || "Signup failed.");
        } else if (data.success) {
          
          // alert("Signup successful! Redirecting to login...");
           navigate("/login");
          <Link to="/login" />;
        } else {
          setServerError("Something went wrong.");
        }
      } catch (error) {
        setServerError("Server error. Please try again.");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Create Account 🚀</h2>
          <p>Join us by filling the details below</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              id="Username"
              name="Username"
              placeholder="Enter your username"
              value={formik.values.Username}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            {formik.touched.Username && formik.errors.Username && (
              <div className="error-msg">{formik.errors.Username}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-msg">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formik.values.password}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-msg">{formik.errors.password}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error-msg">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {serverError && <div className="error-msg">{serverError}</div>}

          <div className="login-actions">
            <button
              type="submit"
              className="login-btn"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <span className="loading-spinner"></span> Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p className="signup-redirect">
            Already have an account? <Link  to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
