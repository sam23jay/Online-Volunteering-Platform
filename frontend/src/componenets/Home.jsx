import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../assets/css/Home.css";
import dog from "../assets/css/dog-tina.jpg";
import purple from "../assets/css/background1.svg";
import help from "../assets/css/help.jpg";
import Footer from "./Footer";

const Home = () => {
  useEffect(() => {
    function revealElementsOnScroll() {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        if (isElementPartiallyInViewport(element)) {
          element.classList.add("reveal");
        }
      });
    }

    function isElementPartiallyInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    window.addEventListener("scroll", revealElementsOnScroll);

    revealElementsOnScroll();

    return () => {
      window.removeEventListener("scroll", revealElementsOnScroll);
    };
  }, []);

  return (
    <div>
      <div className="position-landing-land">
        <img className="image-purple" src={purple} alt="purp bg" />
        <div className="land-1">
          <div className="land-text-container">
            <p className="land-welcome animate-on-scroll">
              Where Compassion Meets Action.
            </p>
            <p className="land-subtext animate-on-scroll">
              Join Our Community of Changemakers and Become Part Of a Global
              Network
            </p>
            <div className="box-container">
              <Link
                to="/volunteer/login"
                className="action-box animate-on-scroll"
              >
                <h2 className="box-heading">Volunteer</h2>
                <p className="box-subtext">
                  Find volunteering opportunities and enroll for events
                </p>
                <LeftOutlined className="box-icon" />
              </Link>
              <Link to="/org/login" className="action-box animate-on-scroll">
                <h2 className="box-heading">Organize</h2>
                <p className="box-subtext">
                  Create and manage events for your organization
                </p>
                <LeftOutlined className="box-icon" />
              </Link>
              <Link to="/about" className="action-box animate-on-scroll">
                <h2 className="box-heading">Learn</h2>
                <p className="box-subtext">
                  Explore learning resources and grow your skills
                </p>
                <LeftOutlined className="box-icon" />
              </Link>
            </div>
          </div>
        </div>
        <div className="content-container animate-on-scroll">
          <div className="dog-image-container">
            <img
              src={dog}
              className="image-home-page"
              alt="dog"
              style={{ width: "165%" }}
            />
          </div>
          <div className="text-container ">
            <h1 className="big-text">
              Want to Volunteer At a Dog Shelter Today?
            </h1>
            <p className="subtext">
              We have all options available and then some.
            </p>
          </div>
        </div>
        <div className="content-container1 animate-on-scroll">
          <div className="text-container1">
            <h1 className="big-text1">
              Want to Organize Events For Your Community?
            </h1>
            <p className="subtext1">
              Explore our organizing features and seamless ease of use.
            </p>
          </div>
          <div className="dog-image-container1">
            <img
              className="image-home-page"
              style={{ width: "140%" }}
              src={help}
              alt="cat"
            />
          </div>
        </div>
        <div className="title-container">
          <h1 className="big-text2 animate-on-scroll">The Largest and Most</h1>
          <h1 className="big-text2 animate-on-scroll">Thriving Ecosystem</h1>
        </div>
        <div className="statistics-container">
          <div className="stat-box animate-on-scroll">
            <h1>78+</h1>
            <p>Total Countries</p>
          </div>
          <div className="stat-box animate-on-scroll">
            <h1>9K+</h1>
            <p>Events Organized</p>
          </div>
          <div className="stat-box animate-on-scroll">
            <h1>100K+</h1>
            <p>Volunteers Enrolled</p>
          </div>
          <div className="stat-box animate-on-scroll">
            <h1>2K+</h1>
            <p>Organizations</p>
          </div>
          <div className="stat-box animate-on-scroll">
            <h1>2M+</h1>
            <p>Followers</p>
          </div>
          <div className="stat-box animate-on-scroll">
            <h1>80M+</h1>
            <p>Impressions</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
