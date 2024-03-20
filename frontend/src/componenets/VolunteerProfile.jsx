import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "../assets/css/Volunteer/Profile.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import trump from "../assets/pics/trump.webp";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { green } from "@mui/material/colors";
import green1 from "../assets/pics/green-earth.jpg";
import gikk from "./Volunteer/yoann.jpg";
const VolunteerProfile = () => {
  const { volID } = useParams();
  const user = useSelector(selectUser);
  const orgname = user.user.email;
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [eventsprof, setEventsProf] = useState([]);

  useEffect(() => {
    console.log(volID);
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
      .get(`http://localhost:8222/api/auth/user/${volID}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    axios
      .get(`http://localhost:8222/api/ev/enrolledEvents/${volID}`, { headers })
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
        "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },

    {
      original:
        "https://images.unsplash.com/photo-1576699204553-e716091b031c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  return (
    <div className="volunteer-prof-overflow">
      <div className="volunteer-profile-container">
        <div className="volunteer-profile-photo">
          <img src={gikk} alt="Profile" />
        </div>
        <div className="volunteer-username">
          <p>{userDetails.username}</p>
        </div>
      </div>
      <div className="volunteer-description-box italic-text">
        <p>{userDetails.description}</p>
      </div>
      <div>
        <h2 className="volunteer-gallery-heading">Gallery</h2>
        <Gallery className="gal-vol-gal" items={images} />
      </div>

      <h2 className="volunteer-profile-event-heading">Events Enrolled</h2>
      <div className="volunteer-event-prof-pos">
        <div className="volunteer-event-list-profile">
          <Container fluid>
            <Row>
              {eventsprof.map((event) => (
                <Col key={event.id} xs={12} md={6} lg={4}>
                  <Card className="event-card11">
                    <Card.Img
                      src={green1}
                      alt={event.name}
                      className="event-image11"
                    />
                    <Card.Body className="event-details11">
                      <Card.Title>{event.name}</Card.Title>
                      <Card.Text>Date: {event.eventDate}</Card.Text>
                      <Card.Text>Location: {event.address}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VolunteerProfile;
