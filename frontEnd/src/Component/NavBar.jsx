import React, { useState } from 'react';
import '../Css/NavBar.css'; 
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="NavBar">
      <div className="NavBar-LogoSection">
        <Link to='/' className='NavBar-LogoSection-Link'>
          <span className="NavBar-Logo-Icon" aria-label="SatisNation Logo">🏛️</span>
          <span className="NavBar-Logo-Text">SatisNation</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="NavBar-MenuToggle" onClick={toggleMenu}>
        <span className={`NavBar-MenuToggle-Bar ${isMenuOpen ? 'active' : ''}`}></span>
        <span className={`NavBar-MenuToggle-Bar ${isMenuOpen ? 'active' : ''}`}></span>
        <span className={`NavBar-MenuToggle-Bar ${isMenuOpen ? 'active' : ''}`}></span>
      </div>

      <ul className={`NavBar-Links ${isMenuOpen ? 'active' : ''}`}>
        <li className="NavBar-Link-Item">
          <NavLink to='/home' className='NavBar-Link' onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li className="NavBar-Link-Item">
          <NavLink to='/leaderboard' className="NavBar-Link" onClick={() => setIsMenuOpen(false)}>
            LeaderBoard
          </NavLink>
        </li>
        <li className="NavBar-Link-Item">
          <NavLink to='/about' className="NavBar-Link" onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>
        </li>
        <li className="NavBar-Link-Item">
          <NavLink to='/contact' className="NavBar-Link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="NavBar-ProfileSection">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            "NavBar-LoginBtn" + (isActive ? " active" : "")
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            "NavBar-SignUpBtn" + (isActive ? " active" : "")
          }
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}