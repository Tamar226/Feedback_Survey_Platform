import React, { useState, useEffect } from 'react';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import LastSurveys from './LastSurveys';
import './HomePageStyle.css'; 

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="homepage-background"></div>
      <AboutUs />
      <LastSurveys/>
      <ContactUs />
      {showPopup && (
        <div className="popup-container">
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button1" onClick={() => setShowPopup(false)}>X</button>
              <h1>Welcome to Our Survey Platform!</h1>
              <p>Join our community to participate in surveys and create your own.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
