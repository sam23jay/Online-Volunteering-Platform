import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Footer";
import "../../assets/css/Volunteer/Explore.css";
import green from "../../assets/pics/green-earth.jpg";
import daisy from "../../assets/pics/daisyy.jpg";
import purp from "../../assets/pics/tam-purp.jpg";
import star from "../../assets/pics/cotton-thumb.jpg";
import ra1 from "../../assets/pics/ra1.jpg";
import ra2 from "../../assets/pics/ra2.jpg";
import ra3 from "../../assets/pics/ra3.jpg";
import ra4 from "../../assets/pics/ra4.jpg";
import ra5 from "../../assets/pics/ra5.jpg";
import ra6 from "../../assets/pics/ra6.jpg";
import ra7 from "../../assets/pics/ra7.jpg";
import ChatIcon from "@mui/icons-material/Chat"; // Import the Chat icon
import BuildIcon from "@mui/icons-material/Build"; // Import the Build icon
import PeopleIcon from "@mui/icons-material/People"; // Import the People icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the AccountCircle icon
import WorkIcon from "@mui/icons-material/Work"; // Import the Work icon
import PaletteIcon from "@mui/icons-material/Palette"; // Import the Palette icon

import StarIcon from "@mui/icons-material/Star";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tay from "../../assets/pics/tay.webp";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import the Favorite icon
import AdjustIcon from "@mui/icons-material/Adjust"; // Import the Adjust icon

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const Explore = () => {
  const user = useSelector(selectUser);
  const orgname = user.user.email;
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNew = localStorage.getItem("isNewUser");
  useEffect(() => {
    setAllEvents((prevEvents) => shuffleArray(prevEvents));
    if (orgname !== null) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, user);

  if (!isLogged) {
    navigate("/");
  }
  const bearerToken = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8222/api/vol/get", { headers })
      .then((response) => {
        console.log(response.data);
        const eventsFromServer = response.data;
        setAllEvents(eventsFromServer);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const firstThreeEvents = allEvents.slice(0, 3);
  const remainingEvents = allEvents.slice(3);

  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const toggleEnrollment = (eventId) => {
    if (enrolledEvents.includes(eventId)) {
      // Unenroll the volunteer
      axios
        .delete(
          `http://localhost:8222/api/vol/unenroll/${eventId}/${localStorage.getItem(
            "orgId"
          )}`,
          {
            headers,
          }
        )
        .then((response) => {
          console.log("Unenrolled successfully");
          setEnrolledEvents(enrolledEvents.filter((id) => id !== eventId));
        })
        .catch((error) => {
          console.error("Error unenrolling:", error);
        });
    } else {
      console.log("hello");
      axios
        .post(
          `http://localhost:8222/api/vol/enroll/${eventId}/${localStorage.getItem(
            "orgId"
          )}`,
          null,
          { headers }
        )
        .then((response) => {
          if (response.data === "Volunteer is already enrolled in the event.") {
            setPopupMessage("Already enrolled");
            setIsPopupVisible(true);

            setTimeout(() => {
              setIsPopupVisible(false);
            }, 3000);
          } else {
            console.log(response.data);
            setEnrolledEvents([...enrolledEvents, eventId]);
          }
        })
        .catch((error) => {
          console.error("Error enrolling:", error);
        });
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleFeedbackSubmit = () => {
    navigate("/volunteer/feedback");
    setFeedbackSubmitted(true);
    setRating(0);
  };
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsPopup, setShowSkillsPopup] = useState(true);

  const filteredEvents = allEvents.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleProfile = () => {
    navigate("/volunteer/profile");
  };
  const skillsList = [
    {
      id: 1,
      name: "Compassion",
      icon: <FavoriteIcon fontSize="large" style={{ color: "#FF00E6" }} />, // Use the Favorite icon
    },
    {
      id: 2,
      name: "Communication",
      icon: <ChatIcon fontSize="large" style={{ color: "blue" }} />, // Use the Chat icon
    },
    {
      id: 3,
      name: "Adaptability",
      icon: <AdjustIcon fontSize="large" style={{ color: "red" }} />, // Use the Chat icon
    },
    {
      id: 4,
      name: "Empathy",
      icon: <StarIcon fontSize="large" style={{ color: "gold" }} />, // Use the Chat icon
    },
    {
      id: 5,
      name: "Problem-Solving",
      icon: <BuildIcon fontSize="large" style={{ color: "grey" }} />, // Use the Build icon for Problem-Solving
    },
    {
      id: 6,
      name: "Teamwork",
      icon: <PeopleIcon fontSize="large" style={{ color: "limegreen" }} />, // Use the Build icon for Problem-Solving
    },
    {
      id: 7,
      name: "Leadership",
      icon: <AccountCircleIcon fontSize="large" style={{ color: "aqua" }} />, // Use the Chat icon
    },
    {
      id: 8,
      name: "Creativity",
      icon: <PaletteIcon fontSize="large" style={{ color: "orange" }} />, // Use the Chat icon
    },
  ];
  const [selectedSkillNames, setSelectedSkillNames] = useState([]);

  const toggleSkill = (skill) => {
    const skillIndex = selectedSkills.findIndex((s) => s.id === skill.id);
    if (skillIndex !== -1) {
      // Skill is already selected, unselect it
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
      setSelectedSkillNames(
        selectedSkillNames.filter((name) => name !== skill.name)
      );
    } else {
      if (selectedSkills.length < 3) {
        // Select the skill
        setSelectedSkills([...selectedSkills, skill]);
        setSelectedSkillNames([...selectedSkillNames, skill.name]);
      }
    }
    console.log(selectedSkillNames);
  };

  const skillSubmit = () => {
    localStorage.setItem("isNewUser", false);
    setShowSkillsPopup(false);

    // Convert selected skills to a string separated by commas
    const skillNames = selectedSkillNames.join(",");
    console.log(skillNames);
    // Send a POST request to the backend to update user skills
    const bearerToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `http://localhost:8222/api/skills/update/${localStorage.getItem(
          "orgId"
        )}`,
        { skills: skillNames },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating skills:", error);
      });
  };
  const eventClick = (eventID) => {
    console.log(eventID);
    navigate(`/volunteer/event/${eventID}`);
  };
  const eventImages = [
    green,
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

  // ... (your existing code)

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * eventImages.length);
    return eventImages[randomIndex];
  };
  return (
    <div className="explore-container">
      {isPopupVisible && (
        <div className="popup-message">
          <p>{popupMessage}</p>
        </div>
      )}
      <div className="search-bar">
        {isNew === "true" && showSkillsPopup && (
          <div className="skills-popup">
            <div className="skills-popup-content">
              <h3 className="heading-personalized">
                Personalize Your Experience!
              </h3>
              <div className="skills-description">
                <p>
                  Customize your experience by mentioning
                  <br />
                  your special qualities!!!!!
                </p>
              </div>
              {selectedSkills.length > 0 && (
                <div className="selected-skills">
                  {selectedSkills.map((skill) => (
                    <div key={skill.id} className="selected-skill">
                      {skill.name}
                      <span
                        className="remove-skill"
                        onClick={() => toggleSkill(skill)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="skills-list">
                {skillsList.map((skill) => (
                  <div
                    key={skill.id}
                    className={`skill-box ${
                      selectedSkills.includes(skill) ? "active" : ""
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill.icon}
                    <div className="skill-text">
                      <p>{skill.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="close-popup-btn-loc">
                <button className="close-popup-btn" onClick={skillSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}{" "}
        {/* Use strict comparison */}
        <Input
          style={{ color: "white" }}
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
      {searchQuery ? (
        <div className="event-list-org11">
          <h1>Search Results</h1>
          <Container fluid>
            <Row>
              {filteredEvents.map((event, index) => (
                <Col key={event.eventID} xs={12} md={6} lg={4}>
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
                      <Button
                        className={`custom-enroll-button ${
                          enrolledEvents.includes(event.id) ? "enrolled" : ""
                        }`}
                        onClick={() => toggleEnrollment(event.id)}
                      >
                        {enrolledEvents.includes(event.id)
                          ? "Enrolled"
                          : "Enroll"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      ) : (
        <div>
          <div className="event-list-org11">
            <h1>For You, {orgname}</h1>
            <Container fluid>
              <Row>
                {firstThreeEvents.map((event, index) => (
                  <Col key={event.eventID} xs={12} md={6} lg={4}>
                    <Card className="event-card11">
                      <Card.Img
                        src={eventImages[index % eventImages.length]}
                        alt={event.title}
                        className="event-image11"
                        onClick={() => eventClick(event.eventID)}
                      />
                      <Card.Body className="event-details11">
                        <Card.Title>{event.name}</Card.Title>
                        <Card.Text>Date: {event.eventDate}</Card.Text>
                        <Card.Text>Location: {event.address}</Card.Text>
                        <Button
                          className={`custom-enroll-button ${
                            enrolledEvents.includes(event.eventID)
                              ? "enrolled"
                              : ""
                          }`}
                          onClick={() => toggleEnrollment(event.eventID)}
                        >
                          {enrolledEvents.includes(event.eventID)
                            ? "Enrolled"
                            : "Enroll"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            <div className="custom-profile-box" onClick={handleProfile}>
              <div className="custom-profile-image">
                <img
                  src={purp}
                  alt="Custom Profile"
                  className="profile-image-act"
                />
              </div>
              <div className="custom-profile-text">
                <h2>Customize Your Profile!</h2>
                <p>Personalize your profile to stand out.</p>
              </div>
            </div>
            <div className="custom-profile-box" onClick={handleFeedbackSubmit}>
              <div className="custom-profile-image">
                <img
                  src={star}
                  alt="Custom Profile"
                  className="profile-image-act"
                />
              </div>
              {feedbackSubmitted ? (
                <div className="custom-profile-text-feed">
                  <h2>Thank You For Your Feedback!</h2>
                </div>
              ) : (
                <div className="custom-profile-text">
                  <h2>Provide Us Feedback!</h2>
                  <p>Click Here to Rate Our Platform!</p>
                </div>
              )}
            </div>
          </div>
          <h1 className="more-events">More Events</h1>
          <Container fluid>
            <Row>
              {remainingEvents.map((event, index) => (
                <Col key={event.eventID} xs={12} md={6} lg={4}>
                  <Card className="event-card11">
                    <Card.Img
                      src={eventImages[index % eventImages.length]}
                      alt={event.title}
                      className="event-image11"
                      onClick={() => eventClick(event.eventID)}
                    />
                    <Card.Body className="event-details11">
                      <Card.Title>{event.name}</Card.Title>
                      <Card.Text>Date: {event.eventDate}</Card.Text>
                      <Card.Text>Location: {event.address}</Card.Text>
                      <Button
                        className={`custom-enroll-button ${
                          enrolledEvents.includes(event.eventID)
                            ? "enrolled"
                            : ""
                        }`}
                        onClick={() => toggleEnrollment(event.eventID)}
                      >
                        {enrolledEvents.includes(event.eventID)
                          ? "Enrolled"
                          : "Enroll"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Explore;
