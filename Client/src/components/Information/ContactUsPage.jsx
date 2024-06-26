import React from 'react';
import './ContactUs.css'; // Import CSS file for styling (optional)

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>Welcome to our survey platform! Whether you're here to participate in surveys or create your own, we're here to help.</p>
      
      <h2>Get in Touch</h2>
      <p>If you have any questions or need assistance, feel free to reach out to us:</p>
      <ul>
        <li>Email: support@surveyplatform.com</li>
        <li>Phone: +1 (800) 123-4567</li>
        <li>Address: 123 Survey Lane, Survey City, SC 12345</li>
      </ul>
      
      <h2>How to Connect</h2>
      <p>To start using our platform, follow these steps:</p>
      <ol>
        <li><strong>Sign Up:</strong> Create an account by clicking on the "Sign Up" button at the top right corner of the page. Fill in your details and verify your email address.</li>
        <li><strong>Log In:</strong> If you already have an account, simply click on the "Log In" button and enter your credentials.</li>
      </ol>
      
      <h2>Using Our Platform</h2>
      <h3>Participate in Surveys</h3>
      <p>Once logged in, you can participate in surveys by navigating to the "Surveys" section. Select a survey that interests you and follow the instructions to complete it.</p>
      
      <h3>Create Your Own Surveys</h3>
      <p>If you're a business owner or have the need to create surveys, you can do so by following these steps:</p>
      <ol>
        <li><strong>Navigate to "My Surveys":</strong> Click on the "My Surveys" tab in the main menu.</li>
        <li><strong>Create a New Survey:</strong> Click the "Create New Survey" button. You'll be prompted to enter the survey details, such as title, description, and questions.</li>
        <li><strong>Publish Your Survey:</strong> Once your survey is ready, click "Publish" to make it available to participants.</li>
        <li><strong>Track Responses:</strong> Monitor the responses in real-time and analyze the results using our built-in tools.</li>
      </ol>

      <h2>Support</h2>
      <p>If you encounter any issues or have any questions, our support team is here to assist you. Visit our <a href="/support">Support Page</a> for more information and resources.</p>
      
      <h2>Follow Us</h2>
      <p>Stay updated with the latest news and updates from our platform by following us on social media:</p>
      <ul>
        <li><a href="https://facebook.com/surveyplatform">Facebook</a></li>
        <li><a href="https://twitter.com/surveyplatform">Twitter</a></li>
        <li><a href="https://linkedin.com/company/surveyplatform">LinkedIn</a></li>
      </ul>
    </div>
  );
};

export default ContactUs;
