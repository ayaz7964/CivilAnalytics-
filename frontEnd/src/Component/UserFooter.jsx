import React from "react";
import "../Css/Footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserFooter() {
  return (
    <footer className="FooterPro">
      <div className="FooterPro-Main">
        <div className="FooterPro-Top">
          {/* Brand Section */}
          <div className="FooterPro-Brand">
            <div className="FooterPro-Logo">
              <span className="FooterPro-LogoIcon">🏛️</span>
              <span className="FooterPro-LogoText">SatisNation</span>
            </div>
            <p className="FooterPro-Description">
              Your personalized dashboard for tracking satisfaction, surveys, and progress. Stay engaged and help shape a better future!
            </p>
            <div className="FooterPro-Contact">
              <h4 className="FooterPro-ContactTitle">Support</h4>
              <div className="FooterPro-ContactInfo">
                support@satisnation.org
                <br />
                +92 3149972398
                <br />
                Mon - Fri, 9:00 AM - 6:00 PM PST
              </div>
            </div>
            <div className="FooterPro-Social">
              <a href="#" className="FooterPro-SocialIcon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="FooterPro-SocialIcon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="FooterPro-SocialIcon" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Dashboard Links */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Dashboard</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <Link to="/dashboard" className="FooterPro-Link">
                  Overview
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/profile" className="FooterPro-Link">
                  Profile
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/survey" className="FooterPro-Link">
                  Take Survey
                </Link>
              </li>
            </ul>
          </div>

          {/* User Resources */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Resources</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <Link to="#" className="FooterPro-Link">
                  FAQ
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="#" className="FooterPro-Link">
                  Help Center
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="#" className="FooterPro-Link">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="FooterPro-Column usernewsletter">
            <div className="FooterPro-Newsletter">
              <h4 className="FooterPro-NewsletterTitle">Newsletter</h4>
              <p className="FooterPro-NewsletterDesc">
                Get updates on your progress and new features.
              </p>
              <form className="FooterPro-NewsletterForm">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="FooterPro-NewsletterInput"
                  required
                />
                <button type="submit" className="FooterPro-NewsletterBtn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="FooterPro-Divider"></div>

        <div className="FooterPro-Bottom">
          <div className="FooterPro-Copyright">
            <span>
              &copy; {new Date().getFullYear()} SatisNation. All rights reserved.
            </span>
          </div>
          <div className="FooterPro-Legal">
            <Link to="#" className="FooterPro-LegalLink">
              Privacy Policy
            </Link>
            <Link to="#" className="FooterPro-LegalLink">
              Terms of Service
            </Link>
            <Link to="#" className="FooterPro-LegalLink">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}