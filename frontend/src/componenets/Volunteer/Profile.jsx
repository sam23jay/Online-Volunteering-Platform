import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "../../assets/css/Volunteer/Profile.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import daisy from "../../assets/pics/daisyy.jpg";
import ra1 from "../../assets/pics/ra1.jpg";
import ra2 from "../../assets/pics/ra2.jpg";
import ra3 from "../../assets/pics/ra3.jpg";
import ra4 from "../../assets/pics/ra4.jpg";
import ra5 from "../../assets/pics/ra5.jpg";
import ra6 from "../../assets/pics/ra6.jpg";
import ra7 from "../../assets/pics/ra7.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import { green } from "@mui/material/colors";
import green1 from "../../assets/pics/green-earth.jpg";
import gikk from "./yoann.jpg";
import { Button as CustomButton } from "reactstrap";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const Profile = () => {
  const user = useSelector(selectUser);
  const orgname = user.user.email;
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [eventsprof, setEventsProf] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventName, setEventName] = useState(null);
  const bearerToken = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };
  const toggleEnrollment = (eventID, eventName) => {
    setShowConfirmationModal(true);
    setSelectedEvent(eventID);
    setEventName(eventName);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmationModal(false);
    if (confirmed) {
      axios
        .delete(
          `http://localhost:8222/api/vol/unenroll/${selectedEvent}/${localStorage.getItem(
            "orgId"
          )}`,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response);
          setEventsProf((prevEvents) =>
            prevEvents.filter((event) => event.eventID !== selectedEvent)
          );
        })
        .catch((error) => {
          console.error("Error unenrolling from event:", error);
        });
      console.log("Unenrolling from event", selectedEvent);
    }
  };

  useEffect(() => {
    setEnrolledEvents((prevEvents) => shuffleArray(prevEvents));

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
      .get(
        `http://localhost:8222/api/auth/user/${localStorage.getItem("orgId")}`,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data);
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
  const eventImages = [
    green1,
    daisy,
    ra1,
    ra2,
    ra3,
    ra4,
    ra5,
    ra6,
    ra7,
    // Add more image sources as needed
    // Ensure you have at least 10 images for each event
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
              {eventsprof.map((event, index) => (
                <Col key={event.id} xs={12} md={6} lg={4}>
                  <Card className="event-card11">
                    <Card.Img
                      src={eventImages[index % eventImages.length]}
                      alt={event.name}
                      className="event-image11"
                      onClick={() => {
                        navigate(`/volunteer/event/${event.eventID}`);
                      }}
                    />
                    <Card.Body className="event-details11">
                      <Card.Title>{event.name}</Card.Title>
                      <Card.Text>Date: {event.eventDate}</Card.Text>
                      <Card.Text>Location: {event.address}</Card.Text>
                      <CustomButton
                        className={`custom-enroll-button ${
                          enrolledEvents.includes(event.eventID)
                            ? "enrolled"
                            : ""
                        }`}
                        onClick={() =>
                          toggleEnrollment(event.eventID, event.name)
                        }
                      >
                        Unenroll
                      </CustomButton>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmationModal}
        onHide={() => handleConfirmation(false)}
      >
        <Modal.Header className="modal-total">
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-total">
          Are you sure you want to unenroll from "{eventName}"?
        </Modal.Body>
        <Modal.Footer className="modal-total">
          <Button variant="secondary" onClick={() => handleConfirmation(false)}>
            <FaTimes /> {/* Cross icon from react-icons */}
          </Button>
          <Button variant="primary" onClick={() => handleConfirmation(true)}>
            <FaCheck /> {/* Cross icon from react-icons */}
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Profile;
