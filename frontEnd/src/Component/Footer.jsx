import React from "react";
import "../Css/Footer.css";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="FooterPro">
      <div className="FooterPro-Top">
        <div className="FooterPro-Newsletter">
          <h2>Stay informed</h2>
          <p>Sign up for our newsletter.</p>
          <form className="FooterPro-NewsletterForm">
            <input
              type="email"
              placeholder="Your Email Address"
              aria-label="Your Email Address"
              className="FooterPro-NewsletterInput"
            />
            <button type="submit" className="FooterPro-NewsletterBtn">
              Subscribe
            </button>
          </form>
        </div>
        <div className="FooterPro-Org">
          <div className="FooterPro-OrgLogo">
            <span
              role="img"
              aria-label="CiviAnalytics Logo"
              className="FooterPro-LogoIcon"
            >
              📊
            </span>
            <span className="FooterPro-LogoText">CiviAnalytics</span>
          </div>
          <div className="FooterPro-OrgDesc">
            <p>
              Conducting global surveys on government services.
              <br />
              Ranking countries by citizen satisfaction.
            </p>
            <p>
              <strong>Contact:</strong>
              <br />
              info@civianalytics.org
              <br />
              +1 234 567 8901
            </p>

            <div className="FooterPro-Social">
              <a href="#" aria-label="Twitter" className="FooterPro-SocialIcon">
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="FooterPro-SocialIcon"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="FooterPro-SocialIcon"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="FooterPro-Links">
          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Survey</a>
              </li>
              <li>
                <a href="#">Results</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Insights</a>
              </li>
              <li>
                <a href="#">Data Visualization</a>
              </li>
              <li>
                <a href="#">Country Rankings</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="FooterPro-Bottom">
        &copy; {new Date().getFullYear()} CiviAnalytics. All rights reserved. |
        Empowering citizens, improving governance.
      </div>
    </footer>
  );
}
