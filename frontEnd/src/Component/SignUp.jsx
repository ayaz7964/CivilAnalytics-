import React, { useEffect, useState } from 'react';
import '../Css/SignUp.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignUp() {
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        document.title = 'Sign Up';
    }, []);

    const validationSchema = Yup.object().shape({
        Username: Yup.string()
            .required('Username is required')
            .min(2, 'Username must be at least 2 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const initialValues = {
        Username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setServerError('');
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.Username, // use lowercase for backend
                    email: values.email,
                    password: values.password
                }),
            });

            // Handle non-JSON or network errors
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                setServerError('Unexpected server response. Please try again.');
                setSubmitting(false);
                return;
            }

            // Handle HTTP errors
            if (!response.ok) {
                if (data && data.error) {
                    if (data.error.toLowerCase().includes('already exists')) {
                        setServerError('User already exists. Please log in or use a different email.');
                    } else {
                        setServerError(data.error);
                    }
                } else {
                    setServerError('Sign Up failed. Please try again.');
                }
                setSubmitting(false);
                return;
            }

            // Handle success
            if (data.success) {
                alert('Sign Up successful! Please log in.');
                window.location.href = '/login';
            } else if (data.error && data.error.toLowerCase().includes('already exists')) {
                setServerError('User already exists. Please log in or use a different email.');
            } else if (data.message) {
                setServerError(data.message);
            } else {
                setServerError('Sign Up failed. Please try again.');
            }
        } catch (error) {
            setServerError('Server error. Please try again.');
        }
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="signup-bg">
            <div className="signup-card">
                <div className="signup-image-section">
                    {/* Replace with your image */}
                    <img src="https://specials-images.forbesimg.com/imageserve/5ffa4ea25f3704b760abea7b/Group-of-friends-huddle-in-rear-view-together-showing-importance-of-belonging-/960x0.jpg?fit=scale" alt="Sign Up" className="signup-image" />
                </div>
                <div className="signup-form-section">
                    <h1>Sign Up</h1>
                    <form onSubmit={formik.handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                id="Username"
                                name="Username"
                                onChange={formik.handleChange}
                                value={formik.values.Username}
                                className={formik.touched.Username && formik.errors.Username ? 'input-error' : ''}
                            />
                            {formik.touched.Username && formik.errors.Username && (
                                <div className="error">{formik.errors.Username}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="error">{formik.errors.password}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="error">{formik.errors.confirmPassword}</div>
                            )}
                        </div>
                        {serverError && <div className="server-error">{serverError}</div>}
                        <button type="submit" className="signup-button" disabled={formik.isSubmitting}>Sign Up</button>
                    </form>
                    <p className="login-link">
                        Already have an account? <a href="/login">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}