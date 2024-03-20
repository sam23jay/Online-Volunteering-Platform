import React from "react";
import "../assets/css/AboutUs.css"; 
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-header">About Harmony</h1>
      <div className="about-us-content">
        <p>
          Welcome to our platform dedicated to making a positive impact! We
          believe that small acts of kindness can bring about significant
          change. 💪
        </p>
        <hr className="divider" />
        <p>
          Our mission is to connect passionate volunteers with organizations
          hosting events that matter. 🌟
        </p>
        <hr className="divider" />
        <p>
          Whether you're looking to lend a helping hand or seeking dedicated
          volunteers for your cause, we've got you covered. 🤝
        </p>
        <hr className="divider" />
        <p>
          Join our community today and be part of something bigger than
          yourself. Together, we can make the world a better place! 🌍❤️
        </p>
        <hr className="divider" />
        <p>
          Our platform provides a seamless experience for both volunteers and
          organizations. Volunteers can easily browse and sign up for events,
          while organizations can effortlessly host and manage their projects.
          📋🤗
        </p>
        <hr className="divider" />
        <p>
          We're committed to transparency, safety, and efficiency. Your trust is
          our priority, and we ensure that every event is a genuine opportunity
          to create a positive impact. 🛡️✨
        </p>
        <hr className="divider" />
        <p>
          Join us on this incredible journey to make the world a better place,
          one volunteer at a time. Let's be the change we wish to see! 🌟❤️
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
