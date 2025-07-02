import React from "react";
import { useUser } from "../User/UserContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../Css/UserNavBar.css";

export default function UserNavBar() {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="NavBar">
      <div className="NavBar-LogoSection">
        <Link to="/" className="NavBar-LogoSection-Link">
          <span className="NavBar-Logo-Icon" aria-label="SatisNation Logo">
            🏛️
          </span>
          <span className="NavBar-Logo-Text">SatisNation</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="NavBar-MenuToggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span
          className={`NavBar-MenuToggle-Bar ${isMenuOpen ? "active" : ""}`}
        ></span>
        <span
          className={`NavBar-MenuToggle-Bar ${isMenuOpen ? "active" : ""}`}
        ></span>
        <span
          className={`NavBar-MenuToggle-Bar ${isMenuOpen ? "active" : ""}`}
        ></span>
      </div>

      <ul className={`NavBar-Links ${isMenuOpen ? "active" : ""}`}>
        <li className="NavBar-Link-Item">
          <NavLink
            to="/dashboard"
            className="NavBar-Link"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="NavBar-Link-Item">
          <NavLink
            to="/profile"
            className="NavBar-Link"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </NavLink>
        </li>
        <li className="NavBar-Link-Item">
          <NavLink
            to="/survey"
            className="NavBar-Link"
            onClick={() => setIsMenuOpen(false)}
          >
            Survey
          </NavLink>
        </li>
      </ul>

      <div className="NavBar-ProfileSection">
        <div
          className="NavBar-UserAvatar"
          title={state.user?.username || "User"}
        >
          {state.user?.username
            ? state.user.username.charAt(0).toUpperCase()
            : "U"}
        </div>
        <div className="NavBar-UserInfo">
          <span className="NavBar-UserName">
            {state.user?.username ? state.user.username : "Username"}
          </span>
          <button className="NavBar-LogoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
