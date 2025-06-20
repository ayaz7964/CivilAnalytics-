import React, { useState } from 'react';
import '../Css/NavBar.css'; 
import { Link } from 'react-router-dom';

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
          <Link to='/home' className='NavBar-Link' onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li className="NavBar-Link-Item">
          <Link to='/leaderboard' className="NavBar-Link" onClick={() => setIsMenuOpen(false)}>
            LeaderBoard
          </Link>
        </li>
        <li className="NavBar-Link-Item">
          <Link to='/about' className="NavBar-Link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </li>
        <li className="NavBar-Link-Item">
          <Link to='/contact' className="NavBar-Link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="NavBar-ProfileSection">
        <Link to="/login" className="NavBar-LoginBtn">
          Login
        </Link>
        <Link to='/signup' className="NavBar-SignUpBtn">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}