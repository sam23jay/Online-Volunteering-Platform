import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "../../assets/css/Volunteer/Profile.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import trump from "../../assets/pics/trump.webp";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import { green } from "@mui/material/colors";
import green1 from "../../assets/pics/green-earth.jpg";
import gikk from "./yoann.jpg";
const EventPage = () => {
  const { eventID } = useParams();

  const user = useSelector(selectUser);
  const orgname = user.user.email;
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [eventsprof, setEventsProf] = useState([]);
  const [names, setNames] = useState();
  useEffect(() => {
    if (orgname !== null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      navigate("/");
    }
  }, [orgname, navigate]);

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };

    axios
      .get(`http://localhost:8222/api/vol/get/${eventID}`, {
        headers,
      })
      .then((response) => {
        setNames(response.data.organizer.name);
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    axios
      .get(
        `http://localhost:8222/api/vol/enrolledEvents/${localStorage.getItem(
          "orgId"
        )}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data);

        setEventsProf(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enrolled events:", error);
      });
  }, [localStorage.getItem("orgId")]);

  const images = [
    {
      original:
        "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },

    {
      original:
        "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];
  const formatDate = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="volunteer-prof-overflow">
      <div className="volunteer-profile-container">
        <div className="volunteer-username">
          <p>{userDetails.name}</p>
        </div>
      </div>
      <div className="volunteer-description-box italic-text">
        <p>{userDetails.description}</p>
      </div>
      <div className="IMY2">
        <div className="event-item">
          <span className="event-time">Organized By: {names}</span>
        </div>
        <div className="event-item">
          <span className="event-time">
            Date: {formatDate(userDetails.eventDate)}
          </span>
        </div>
        <div className="event-item">
          <span className="event-time">Location: {userDetails.address}</span>
        </div>
        <h2 className="volunteer-gallery-heading">Gallery</h2>
        <Gallery className="gal-vol-gal" items={images} />
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
