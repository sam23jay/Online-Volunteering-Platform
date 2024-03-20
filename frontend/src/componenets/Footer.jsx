import React from "react";
import "../assets/css/Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => (
  <footer class="footer" className="position-footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>company</h4>
          <ul>
            <li>
              <a href="/about">about us</a>
            </li>
            <li>
              <a href="/about">our services</a>
            </li>
            <li>
              <a href="/privacy">privacy policy</a>
            </li>
            <li>
              <a href="/faq">affiliate program</a>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>get help</h4>
          <ul>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/terms">T&C</a>
            </li>
            <li>
              <a href="/volunteer/login">Events</a>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Register</h4>
          <ul>
            <li>
              <a href="/volunteer/login">volunteer</a>
            </li>
            <li>
              <a href="/org/login">organisation</a>
            </li>
            <li>
              <a href="/">support</a>
            </li>
            <li>
              <a href="/">donate</a>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="/home">
              <FacebookIcon />
            </a>
            <a href="/home">
              <TwitterIcon />
            </a>
            <a href="/home">
              <InstagramIcon />
            </a>
            <a href="/home">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
