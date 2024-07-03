import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <p>Survey Platform is dedicated to providing a platform for individuals and businesses to create and participate in surveys.</p>
      <p>Our mission is to facilitate valuable insights through surveys and to foster community engagement.</p>
      <p>Founded in 2024, Survey Platform has grown to become a leading provider of survey solutions.</p>
      <br />
      <h3 className='h3aboutus'>Success Stories:</h3>
      <div className="testimonials">
        <div className="testimonial">
        <div className="company-logo1"></div>
          <div className="testimonial-content">
            <h4>NVIDIA</h4>
            <p className='companypost'>Since using Survey Platform, our customer satisfaction rates have soared. The insights we've gained through surveys have been invaluable in improving our product offerings. Our sales increased by 20% in just six months.</p>
          </div>
        </div>
        <div className="testimonial">
          <div className="company-logo2"></div>
          <div className="testimonial-content">
            <h4>IKEA</h4>
            <p className='companypost'>Survey Platform has revolutionized the way we gather feedback. The detailed analytics and easy-to-use interface have allowed us to make data-driven decisions that have enhanced our services. We've seen a 30% boost in customer retention.</p>
          </div>
        </div>
        <div className="testimonial">
        <div className="company-logo3"></div>
          <div className="testimonial-content">
            <h4>VISA</h4>
            <p className='companypost'>Using Survey Platform, we've been able to connect with our audience more effectively. The platform's robust features have helped us understand our market better and tailor our strategies accordingly. Our market reach expanded by 25%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
