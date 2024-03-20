import React, { useState } from "react";
import "../assets/css/FAQ.css"; 
import Footer from "./Footer";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is this platform all about?",
      answer:
        "Our platform is a volunteer coordination and event hosting platform. We connect volunteers with organizations hosting events that align with various causes.",
    },
    {
      question: "How can I sign up as a volunteer?",
      answer:
        "To sign up as a volunteer, click on the 'Sign Up' button at the top of the page. Fill out the registration form, and you'll be ready to browse and enroll in events.",
    },
    {
      question: "How can organizations host events on this platform?",
      answer:
        "Organizations can create an account and then click on 'Host Event' in their dashboard. They can fill out event details, and once approved, their event will be live on the platform.",
    },
    {
      question: "Is it safe to use this platform?",
      answer:
        "Yes, safety is our priority. We verify organizations and provide ratings and reviews for events. Volunteers can choose events based on ratings and reviews from other volunteers.",
    },
    {
      question: "How can I contact support if I have questions or issues?",
      answer:
        "You can contact our support team by clicking on 'Contact Us' in the footer. We're here to help and will respond to your inquiries as soon as possible.",
    },
  ];

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <h1 className="faq-header">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
