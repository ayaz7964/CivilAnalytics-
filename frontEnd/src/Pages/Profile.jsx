import React, { useEffect, useState } from 'react';
import '../Css/Profile.css';
import { useUser } from "../User/UserContext";

export default function Profile() {
  const { state, dispatch } = useUser(); // state: { user }
  const user = state?.user;
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [isNew, setIsNew] = useState(false);

  // Debug: log user object
  useEffect(() => {
    console.log('User from context:', user);
  }, [user]);

  // Fetch profile by username
  useEffect(() => {
    if (user === undefined) {
      setLoading(true);
      return;
    }
    if (!user || !user.username) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/profile/username/${user.username}`)
      .then(async res => {
        if (!res.ok) {
          return null;
        }
        const data = await res.json();
        if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
        return data;
      })
      .then(data => {
        if (data && data._id) {
          setProfile(data);
          setForm(data);
          setIsNew(false);
        } else {
          setProfile(null);
          setForm({
            fullName: '',
            country: '',
            city: '',
            address: '',
            phone: '',
          });
          setIsNew(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setProfile(null);
        setIsNew(true);
      });
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEdit(true);
    setMsg('');
    setError('');
  };

  const handleCancel = () => {
    setEdit(false);
    setForm(profile);
    setMsg('');
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setError('');
    const updateData = {
      fullName: form.fullName,
      country: form.country,
      city: form.city,
      address: form.address,
      phone: form.phone,
    };
    try {
      let res, data;
      if (isNew) {
        res = await fetch(`/api/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...updateData,
            username: user.username,
            email: user.email,
            password: "123456" // Remove or handle securely in production
          }),
        });
      } else {
        res = await fetch(`/api/profile/username/${user.username}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      }
      data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Operation failed.');
      } else {
        setProfile(data);
        setForm(data);
        setEdit(false);
        setIsNew(false);
        setMsg(isNew ? 'Profile created successfully!' : 'Profile updated successfully!');
      }
    } catch (err) {
      setError('Operation failed.');
    }
  };

  // If context is still loading, show loading
  if (user === undefined) {
    return (
      <div className="profile-container">
        <div className="profile-loading">Loading user...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="profile-container">
        <div className="profile-error">You must be logged in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <h1>
          <span className="brand">My Profile</span>
        </h1>
        <p className="profile-tagline">
          Manage your account, update your details, and view your insights.
        </p>
      </div>

      {/* Profile Card or Add Profile Prompt */}
      {profile && !edit && (
        <div className="profile-card">
          <div className="profile-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || user.username)}&background=1976d2&color=fff&size=128`}
              alt={profile.fullName || user.username}
            />
          </div>
          <div className="profile-info">
            <h2>{profile.fullName}</h2>
            <p className="profile-username">@{user.username}</p>
            <p>
              <span role="img" aria-label="country">🌍</span> {profile.country}
              <span style={{ marginLeft: 16 }} role="img" aria-label="city">🏙️</span> {profile.city}
            </p>
            <p>
              <span role="img" aria-label="email">📧</span> {user.email}
            </p>
            <p>
              <span role="img" aria-label="phone">📞</span> {profile.phone}
            </p>
            <p>
              <span role="img" aria-label="address">🏠</span> {profile.address}
            </p>
            <button className="profile-edit-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Add Profile Prompt */}
      {isNew && !edit && (
        <div className="profile-card profile-card-empty">
          <div className="profile-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=1976d2&color=fff&size=128`}
              alt={user.username}
            />
          </div>
          <div className="profile-info">
            <h2>Welcome, @{user.username}!</h2>
            <p className="profile-username">{user.email}</p>
            <p>You have not set up your profile yet.</p>
            <button className="profile-edit-btn" onClick={() => setEdit(true)}>
              Add Profile Details
            </button>
          </div>
        </div>
      )}

      {/* Edit/Add Form */}
      {(edit || isNew) && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <h3>{isNew ? 'Create Your Profile' : 'Edit Profile'}</h3>
          <div className="profile-form-row">
            <label>Full Name
              <input name="fullName" value={form.fullName || ''} onChange={handleChange} required />
            </label>
            <label>Username
              <input name="username" value={user.username} disabled />
            </label>
          </div>
          <div className="profile-form-row">
            <label>Country
              <input name="country" value={form.country || ''} onChange={handleChange} required />
            </label>
            <label>City
              <input name="city" value={form.city || ''} onChange={handleChange} required />
            </label>
          </div>
          <div className="profile-form-row">
            <label>Address
              <input name="address" value={form.address || ''} onChange={handleChange} required />
            </label>
            <label>Phone
              <input name="phone" value={form.phone || ''} onChange={handleChange} required />
            </label>
          </div>
          <div className="profile-form-row">
            <label>Email
              <input name="email" type="email" value={user.email} disabled />
            </label>
            <label>Password
              <input name="password" type="password" value="********" disabled />
            </label>
          </div>
          {error && <div className="profile-error">{error}</div>}
          {msg && <div className="profile-success">{msg}</div>}
          <div className="profile-form-actions">
            <button className="profile-save-btn" type="submit">{isNew ? 'Create Profile' : 'Save Changes'}</button>
            {!isNew && <button className="profile-cancel-btn" type="button" onClick={handleCancel}>Cancel</button>}
          </div>
        </form>
      )}

      {/* Insights Section */}
      {profile && (
        <div className="profile-insights">
          <h3>Account Insights</h3>
          <div className="profile-insights-row">
            <div className="profile-insight-card">
              <span className="profile-insight-icon">🕒</span>
              <div>
                <div className="profile-insight-label">Joined</div>
                <div className="profile-insight-value">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '-'}</div>
              </div>
            </div>
            <div className="profile-insight-card">
              <span className="profile-insight-icon">🔄</span>
              <div>
                <div className="profile-insight-label">Last Updated</div>
                <div className="profile-insight-value">{profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : '-'}</div>
              </div>
            </div>
            <div className="profile-insight-card">
              <span className="profile-insight-icon">🔒</span>
              <div>
                <div className="profile-insight-label">Email Verified</div>
                <div className="profile-insight-value">Yes</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Section */}
      <div className="profile-section">
        <h3>Security Tips</h3>
        <ul>
          <li>Use a strong, unique password for your account.</li>
          <li>Never share your password with anyone.</li>
          <li>Update your information regularly to keep your account secure.</li>
        </ul>
      </div>

      {/* Support Section */}
      <div className="profile-section">
        <h3>Need Help?</h3>
        <p>
          For support or questions, contact us at <a href="mailto:info@civianalytics.com">info@civianalytics.com</a>
        </p>
      </div>
    </div>
  );
}