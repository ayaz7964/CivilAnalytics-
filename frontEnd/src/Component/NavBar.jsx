import React from 'react';
import '../Css/NavBar.css'; 
import { Link } from 'react-router-dom'; // If you are using React Router for navigation

export default function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar-LogoSection">
        <Link to= '/' className='NavBar-LogoSection' >
        <span className="NavBar-Logo-Icon" aria-label="CricAnalytics Logo">📊</span>
        <span className="NavBar-Logo-Text">CricAnalytics</span>
        </Link>
      </div>
      <ul className="NavBar-Links">
        <li className="NavBar-Link"><Link to = '/home' className='NavBar-Link'>Home</Link></li>
        <li className="NavBar-Link"><Link to = 'LeaderBord'className="NavBar-Link" >LeaderBoard</Link></li>
        <li className="NavBar-Link"> <Link to = '/about' className="NavBar-Link" >About</Link></li>
        <li className="NavBar-Link"> <Link to =  '/contact' className="NavBar-Link" >Contact</Link></li>
      </ul>
      {/* <div className="NavBar-SearchSection">
        <input
          className="NavBar-SearchInput"
          type="text"
          placeholder="Search surveys, topics..."
        />
        <button className="NavBar-SearchButton" aria-label="Search">🔍</button>
      </div> */}
      <div className="NavBar-ProfileSection">
        {/* <span className="NavBar-Profile-Icon" aria-label="User">👤</span>
        <span className="NavBar-Profile-Name">Username</span> */}
        <p><Link to= "/login" className="NavBar-LoginBtn" >Login</Link></p>
        <p ><Link to = '/signup' className="NavBar-SignUpBtn">Sign Up</Link></p>
      </div>
    </nav>
  );
}