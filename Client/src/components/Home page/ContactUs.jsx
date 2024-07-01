import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>We're here to help! Reach out to us through any of the following methods:</p>
      <ul>
        <li>Email: <a href="mailto:support@surveyplatform.com">support@surveyplatform.com</a></li>
        <li>Phone: +1 (800) 123-4567</li>
        <li>Address: 123 Survey Lane, Survey City, SC 12345</li>
      </ul>
      <p>Follow us on <a href="https://facebook.com/surveyplatform">Facebook</a>, <a href="https://twitter.com/surveyplatform">Twitter</a>, and <a href="https://linkedin.com/company/surveyplatform">LinkedIn</a> for updates.</p>
      {/* <p>For more detailed contact information, please <Link to="/ContactUs">click here</Link>.</p> */}
    </div>
  );
};

export default ContactUs;
