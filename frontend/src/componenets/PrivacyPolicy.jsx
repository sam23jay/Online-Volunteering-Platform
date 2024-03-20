import React from "react";
import "../assets/css/PrivacyPolicy.css";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="priv-header">
        <h1>Privacy Policy</h1>
      </div>

      <div className="priv-section">
        <div className="priv-section-header">
          <h2>Information We Collect</h2>
        </div>
        <div className="priv-section-content">
          <p>
            We may collect personal information that you provide to us, such as
            your name, email address, contact details, and other relevant
            information during the registration process. We collect this
            information for the purpose of providing and improving our services.
          </p>
        </div>
      </div>

      <div className="priv-section">
        <div className="priv-section-header">
          <h2>How We Use Your Information</h2>
        </div>
        <div className="priv-section-content">
          <p>
            We use the information we collect to create and manage user
            accounts, facilitate event signups, and enable organizations to post
            events. Your information may also be used to send you event updates,
            newsletters, and respond to your inquiries.
          </p>
        </div>
      </div>

      <div className="priv-section">
        <div className="priv-section-header">
          <h2>Sharing Your Information</h2>
        </div>
        <div className="priv-section-content">
          <p>
            Your information may be shared with other registered users and
            organizations within our platform for the purpose of coordinating
            volunteer activities and event management. However, we do not sell
            or rent your personal information to third parties.
          </p>
        </div>
      </div>

      <div className="priv-section">
        <div className="priv-section-header">
          <h2>Security Measures</h2>
        </div>
        <div className="priv-section-content">
          <p>
            We implement security measures to protect your personal information
            from unauthorized access or disclosure. These measures include
            encryption, regular system monitoring, and access controls.
          </p>
        </div>
      </div>

      <div className="priv-section">
        <div className="priv-section-header">
          <h2>Contact Us</h2>
        </div>
        <div className="priv-section-content">
          <p>
            If you have any questions about this Privacy Policy or how your
            information is handled, please contact us at .....@gmail.com.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
