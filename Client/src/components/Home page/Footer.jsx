import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Survey Platform. All rights reserved.<br/>Tamar and Hadas Ltd</p>
        <ul className="footer-links">
          <li><a href="/terms">Terms of Use</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
