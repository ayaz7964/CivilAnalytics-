import React, { useContext } from "react";
import { useUser } from "../User/UserContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
// ...existing imports...
import "../Css/UserNavBar.css";

export default function UserNavBar() {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const profile = state.user?.username ? state.user.username : "Profile";
  return (
    <nav className="navbar">
      <div className="NavBar-LogoSection">
        <Link to="/" className="NavBar-LogoSection-Link">
          <span className="NavBar-Logo-Icon" aria-label="SatisNation Logo">
            🏛️
          </span>
          <span className="NavBar-Logo-Text">SatisNation</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        {/* <li><Link to="/settings">Setting</Link></li> */}
        <li>
          <NavLink to="/survey">Survey</NavLink>
        </li>
      </ul>
      {/* <div className="navbar-search">
        <input type="text" placeholder="Search surveys, topic..." />
        <span className="search-icon" role="img" aria-label="search">🔍</span>
      </div> */}

      {/* <div className="navbar-user">
        <span className="navbar-username">
          {state.user?.username ? state.user.username : "Username"}
          
        </span>
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div> */}
      {/* // ...existing code... */}
      <div className="navbar-user">
        <div className="navbar-avatar" title={state.user?.username || "User"}>
          {state.user?.username
            ? state.user.username.charAt(0).toUpperCase()
            : "U"}
        </div>
        <div className="navbar-user-info">
          <span className="navbar-username">
            {state.user?.username ? state.user.username : "Username"}
          </span>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
