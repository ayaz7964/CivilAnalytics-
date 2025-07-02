import React from "react";
import "../Css/Footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
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
              Leading platform for conducting global surveys on government
              services and ranking countries by citizen satisfaction. Empowering
              transparency and accountability worldwide.
            </p>

            <div className="FooterPro-Contact">
              <h4 className="FooterPro-ContactTitle">Get in Touch</h4>
              <div className="FooterPro-ContactInfo">
                info@satisnation.org
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
              <a
                href="#"
                className="FooterPro-SocialIcon"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="FooterPro-SocialIcon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Quick Links</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Home
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/leaderboard" className="FooterPro-Link">
                  Leader Board
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/about" className="FooterPro-Link">
                  About
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/contact" className="FooterPro-Link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Services</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Global Surveys
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Country Rankings
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Data Analytics
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Research Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="FooterPro-Column resources">
            {/* <h4 className="FooterPro-ColumnTitle">Resources</h4> */}
            <ul className="FooterPro-LinkList">
              <h4 className="FooterPro-ColumnTitle">Resources</h4>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Documentation
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  API Access
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  Help Center
                </Link>
              </li>
              <li className="FooterPro-LinkItem">
                <Link to="/home" className="FooterPro-Link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="FooterPro-Column newsletter">
            <div className="FooterPro-Newsletter">
              <h4 className="FooterPro-NewsletterTitle">Newsletter</h4>
              <p className="FooterPro-NewsletterDesc">
                Stay updated with latest insights.
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
              &copy; {new Date().getFullYear()} SatisNation. All rights
              reserved.
            </span>
          </div>
          <div className="FooterPro-Legal">
            <Link to="/privacy" className="FooterPro-LegalLink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="FooterPro-LegalLink">
              Terms of Service
            </Link>
            <Link to="/cookies" className="FooterPro-LegalLink">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
