import React from "react";
import "../Css/Footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

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
              Leading platform for conducting global surveys on government services and ranking countries by citizen satisfaction. Empowering transparency and accountability worldwide.
            </p>
            
            <div className="FooterPro-Contact">
              <h4 className="FooterPro-ContactTitle">Get in Touch</h4>
              <div className="FooterPro-ContactInfo">
                info@satisnation.org<br />
                +92 3149972398<br />
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
          
          {/* Quick Links */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Quick Links</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Home</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">About Us</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Our Mission</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Services</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Global Surveys</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Country Rankings</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Data Analytics</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Research Reports</a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="FooterPro-Column">
            <h4 className="FooterPro-ColumnTitle">Resources</h4>
            <ul className="FooterPro-LinkList">
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Documentation</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">API Access</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">Help Center</a>
              </li>
              <li className="FooterPro-LinkItem">
                <a href="#" className="FooterPro-Link">FAQ</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="FooterPro-Column">
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
            <span>&copy; {new Date().getFullYear()} SatisNation. All rights reserved.</span>
          </div>
          <div className="FooterPro-Legal">
            <a href="#" className="FooterPro-LegalLink">Privacy Policy</a>
            <a href="#" className="FooterPro-LegalLink">Terms of Service</a>
            <a href="#" className="FooterPro-LegalLink">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}