import React, { useEffect, useRef, useState } from "react";
import "../assets/css/OrgDashboard.css";
import AdminPannel from "./AdminPannel";
import green from "../assets/pics/green-earth.jpg";
import daisy from "../assets/pics/daisyy.jpg";
import river from "../assets/pics/river.jpg";
import purp from "../assets/pics/tam-purp.jpg";
import "../assets/css/ProfileOrd.css";
import "../assets/css/DashboardOrg.css";
import logo from "./earth.png";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/UserSlice";
import prof from "./nike.webp";
import { PieChart, Pie, Cell } from "recharts";
import "../assets/css/AnalyticsOrg.css";
import "../assets/css/EventOrg.css";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import tileearth from "../assets/pics/bg-domain.jpg";
import TimePicker from "react-time-picker";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon

import "react-time-picker/dist/TimePicker.css";
import {
  faInstagram,
  faGoogle,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/VolunteerOrg.css";
import {
  faCalendar,
  faUsers,
  faBuilding,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Bar,
  BarChart,
} from "recharts";
import Footer from "./Footer";
import { Button, Input, Label } from "reactstrap";
import "../assets/css/AddEvent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";

const ProfileComponent = () => {
  const [organizationData, setOrganizationData] = useState({
    username: "",
    description: "",
  });
  const images = [
    {
      original:
        "https://images.unsplash.com/photo-1617953141729-04389b3cbd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },

    {
      original:
        "https://images.unsplash.com/photo-1616680214084-22670de1bc82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];
  const [eventsprof, setEventsProf] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `http://localhost:8222/api/auth/user/${localStorage.getItem("orgId")}`,
        {
          headers,
        }
      )
      .then((response) => {
        const { username, description, name } = response.data;
        setOrganizationData({ username, description, name });
      })
      .catch((error) => {
        console.error("Error fetching organization data:", error);
      });
    axios
      .get(
        `http://localhost:8222/api/ev/getByOrgID/${localStorage.getItem(
          "orgId"
        )}`,
        { headers }
      )
      .then((response) => {
        setEventsProf(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events data:", error);
      });
  }, []);

  return (
    <div className="prof-overflow">
      {/* Render organization name and description */}
      <div className="profile-container">
        <div className="profile-photo">
          <img src={logo} alt="Profile" />
        </div>
        <div className="username">
          <p>{organizationData.name}</p>
        </div>
      </div>
      <div className="description-box italic-text">
        <p>{organizationData.description}</p>
      </div>
      <div>
        <h2 className="gallery-heading">Gallery</h2>
        <Gallery items={images} style={{ width: "100px" }} />{" "}
      </div>

      <h2 className="profile-event-heading">Events</h2>
      <div className="event-prof-pos">
        <div className="event-list-profile">
          {eventsprof.map((event) => (
            <div key={event.id} className="event-tile-profile">
              <h3>{event.name}</h3>
              <p>Date: {event.eventDate}</p>
              <p>Location: {event.address}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DashboardComponent = () => {
  const user = useSelector(selectUser);
  const orgname = user.user.email;
  const [isLogged, setIsLogged] = useState(false);
  const [events, setEvents] = useState([]);
  const bearerToken = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };
  useEffect(() => {
    // Make a GET request to fetch events from your API
    axios
      .get(
        `http://localhost:8222/api/ev/getByOrgID/${localStorage.getItem(
          "orgId"
        )}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    if (orgname) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, user);
  const navigate = useNavigate();
  if (!isLogged) {
    navigate("/");
  }

  const [numEvents, setNumEvents] = useState(0);
  const [numVolunteersEnrolled, setNumVolunteersEnrolled] = useState(0);
  const [maxNumVolunteers, setMaxNumVolunteers] = useState(0);
  const [countries, setCountries] = useState(0);

  const volunteers = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Volunteer ${index + 1}`,
  }));

  useEffect(() => {
    const incrementNumbers = () => {
      let eventsCounter = 0;
      let volunteersEnrolledCounter = 0;
      let maxVolunteersCounter = 0;
      let countriesCounter = 0;
      const interval = setInterval(() => {
        if (eventsCounter <= 37) {
          setNumEvents(eventsCounter);
          eventsCounter++;
        }
        if (volunteersEnrolledCounter <= 50) {
          setNumVolunteersEnrolled(volunteersEnrolledCounter);
          volunteersEnrolledCounter++;
        }
        if (maxVolunteersCounter <= 12) {
          setMaxNumVolunteers(maxVolunteersCounter);
          maxVolunteersCounter++;
        }
        if (maxVolunteersCounter <= 3) {
          setCountries(countriesCounter);
          countriesCounter++;
        }

        if (
          eventsCounter > 37 &&
          volunteersEnrolledCounter > 50 &&
          maxVolunteersCounter > 13 &&
          countriesCounter > 4
        ) {
          clearInterval(interval);
        }
      }, 30);
    };

    incrementNumbers();
  }, []);
  const filteredEvents = events.filter((event) => event.id !== null);

  return (
    <div>
      <div className="">
        <div className="org-welcome">
          <h1 className="welcome-title">Welcome, {orgname}!</h1>
        </div>
        <div className="org-info-box">
          <div className="info-list">
            <div className="info-item hoverable">
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ color: "blue", fontSize: "50px" }}
              />
              <div className="info-content">
                <h2 className="info-number">{numEvents}</h2>
                <p className="info-event-name">Events</p>
              </div>
            </div>
            <div className="info-item hoverable">
              <FontAwesomeIcon
                icon={faUsers}
                style={{ color: "yellow", fontSize: "50px" }}
              />
              <div className="info-content">
                <h2 className="info-number">{numVolunteersEnrolled}</h2>
                <p className="info-event-name">Volunteers</p>
              </div>
            </div>
            <div className="info-item hoverable">
              <FontAwesomeIcon
                icon={faBuilding}
                style={{ color: "green", fontSize: "50px" }}
              />
              <div className="info-content">
                <h2 className="info-number">{maxNumVolunteers}</h2>
                <p className="info-event-name">Cities</p>
              </div>
            </div>
            <div className="info-item hoverable">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: "red", fontSize: "50px" }}
              />
              <div className="info-content">
                <h2 className="info-number">4</h2>
                <p className="info-event-name">States</p>
              </div>
            </div>
          </div>
        </div>

        <div className="org-events-and-volunteers">
          <div className="org-event-box-container">
            <div className="org-event-box">
              <div className="event-list">
                <p className="event-header">Event List</p>
                {filteredEvents.map((event) => (
                  <div key={event.id} className="event-item">
                    <div className="event-name">{event.name}</div>
                    <div className="volunteers-enrolled">
                      2 Volunteers Enrolled
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="org-volunteer-box">
            <div className="org-volunteer-list">
              <p className="volunteer-header">Volunteer List</p>
              <div className="volunteer-scrollable-list">
                {volunteers.map((volunteer) => (
                  <div key={volunteer.id} className="volunteer-item">
                    {volunteer.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="org-announcement-box">
            <div className="announcement-header">
              <h2 className="announce-heading">Announcements</h2>
              <button className="add-announcement-button">+</button>
            </div>
            <div className="announcement-list">
              <div className="announcement-item">
                <h3>New volunteer enrolled!</h3>
                <p>Content of Announcement 1.</p>
              </div>
              <div className="announcement-item">
                <h3>Event concluded successfully!</h3>
                <p>Content of Announcement 2.</p>
              </div>
              <div className="announcement-item">
                <h3>New event just begun!</h3>
                <p>Content of Announcement 3.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
const PopupComponent = ({ isOpen, onClose, selectedVolunteer, orgID }) => {
  const [orgData, setOrgData] = useState([]);
  const bearer = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${bearer}`,
  };

  const fetchOrgData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8222/api/ev/enrolledEvents/${orgID}`,
        { headers }
      );
      console.log("man", response.data);
      setOrgData(response.data);
    } catch (error) {
      console.error("Error getting organization data:", error);
    }
  };

  useEffect(() => {
    if (orgID) {
      fetchOrgData();
    }
  }, [orgID]);

  if (!isOpen || !selectedVolunteer) {
    return null;
  }

  const { name, gender, eventsEnrolled, profilePicture } = selectedVolunteer;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <span className="popup-close" onClick={onClose}>
          &times;
        </span>
        <div className="popup-content">
          <img
            src={profilePicture}
            alt={name}
            className="popup-profile-picture"
          />
          <div className="popup-details">
            <h3>{name}</h3>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Events Enrolled:</strong>{" "}
              {orgData.map((org) => org.name).join(", ")}
            </p>
          </div>
          <div className="volunteer-icons">
            <FontAwesomeIcon icon={faGoogle} className="red-icon1" />
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              className="blue-icon1"
            />
            <FontAwesomeIcon icon={faInstagram} className="orange-icon1" />
          </div>
        </div>
      </div>
    </div>
  );
};
const VolunteersComponent = () => {
  const [eventID, setEventID] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const bearerToken = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };
  const getEventIDByOrgID = async (orgID) => {
    try {
      const response = await axios.get(
        `http://localhost:8222/api/ev/getByOrgID/${orgID}`,
        { headers }
      );
      console.log(response.data);
      console.log(bearerToken);
      return response.data;
    } catch (error) {
      console.error("Error getting EventID:", error);
      return null;
    }
  };

  const fetchEventID = async (orgID) => {
    try {
      const response = await axios.get(
        `http://localhost:8222/api/ev/getByOrgID/${orgID}`,
        { headers }
      );

      const eventIDs = response.data.map((event) => event.eventID);
      console.log(eventIDs);
      setEventID(eventIDs);
    } catch (error) {
      console.error("Error getting EventIDs:", error);
    }
  };

  const getVolunteersByEventID = async (eventID) => {
    try {
      const response = await axios.get(
        `http://localhost:8222/api/ev/volunteers/${eventID}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting Volunteers by EventID:", error);
      return null;
    }
  };
  const fetchVolunteersForEvents = async (eventIDs) => {
    const volunteersList = [];
    for (const eventID of eventIDs) {
      const volunteers = await getVolunteersByEventID(eventID);
      if (volunteers) {
        volunteersList.push({ volunteers, eventID });
      }
    }
    console.log("Volunteers List:", volunteersList);
    setVolunteers((prevVolunteers) => [...prevVolunteers, ...volunteersList]);
    console.log("Volunteers State:", volunteers);
  };

  useEffect(() => {
    if (eventID.length > 0) {
      fetchVolunteersForEvents(eventID);
    }
  }, [eventID]);

  useEffect(() => {
    const orgID = localStorage.getItem("orgId");
    fetchEventID(orgID);
  }, []);

  useEffect(() => {
    if (eventID) {
      fetchVolunteersForEvents(eventID);
    }
  }, [eventID]);

  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [sortOrder, setSortOrder] = useState("select");

  const handleSortChange = (sortType) => {
    setSortOrder(sortType);
    setIsDropdownOpen(false);
  };

  const sortedVolunteers = [...volunteers].sort((a, b) => {
    if (sortOrder === "alphabetical") {
      return a.volunteers.name.localeCompare(b.name);
    }
    return 0;
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [popupcontrol, setpopupcontrol] = useState();
  const openPopup = (volunteer) => {
    navigate(`/org/volunteer/${volunteer.orgID}`);
    setSelectedVolunteer(volunteer);
    setIsPopupOpen(true);
    console.log(volunteer.orgID);
    setpopupcontrol(volunteer.orgID);
  };

  const closePopup = () => {
    setSelectedVolunteer(null);
    setIsPopupOpen(false);
  };
  console.log("before");
  console.log(volunteers);
  const volunteersByEvent = {};

  volunteers.forEach((volunteerObject) => {
    const { eventID, volunteers } = volunteerObject;
    if (!volunteersByEvent[eventID]) {
      volunteersByEvent[eventID] = [];
    }
    volunteersByEvent[eventID].push(...volunteers);
  });

  const renderedNames = new Set();
  const showVolunteer = () => {
    console.log();
  };
  return (
    <div className="reg-vol">
      <h2>Registered Volunteers</h2>
      <div className="sort-menu">
        <div className="sort-button" onClick={toggleDropdown}></div>
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <div onClick={() => handleSortChange("alphabetical")}>
              Alphabetical Order
            </div>
            <div onClick={() => handleSortChange("event")}>Event</div>
          </div>
        )}
      </div>{" "}
      <ul className="volunteer-list">
        {Object.keys(volunteersByEvent).map((eventID) => (
          <div key={eventID} onClick={() => showVolunteer(eventID)}>
            <ul className="volunteer-list">
              {volunteersByEvent[eventID].map((volunteer) => {
                if (!renderedNames.has(volunteer.name)) {
                  renderedNames.add(volunteer.name);
                  return (
                    <li
                      key={volunteer.id}
                      className="volunteer-item1"
                      onClick={() => openPopup(volunteer)}
                    >
                      <img
                        src={prof}
                        alt={volunteer.name}
                        className="profile-picture"
                      />
                      <div className="volunteer-info">
                        <div className="volunteer-name">{volunteer.name}</div>
                        <div className="volunteer-details">
                          {volunteer.gender} | {volunteer.eventsEnrolled}
                        </div>
                      </div>
                      <div className="volunteer-icons">
                        <FontAwesomeIcon icon={faGoogle} className="red-icon" />
                        <FontAwesomeIcon
                          icon={faFacebookMessenger}
                          className="blue-icon"
                        />
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="orange-icon"
                        />
                      </div>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        ))}
      </ul>
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={closePopup}
        selectedVolunteer={selectedVolunteer}
        orgID={popupcontrol}
      />
      <Footer />
    </div>
  );
};

const LineChartComponent = () => {
  const data = [
    { name: "Event 1", attendance: 120 },
    { name: "Event 2", attendance: 200 },
    { name: "Event 3", attendance: 150 },
    { name: "Event 4", attendance: 280 },
    { name: "Event 5", attendance: 90 },
  ];
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="attendance" stroke="#36A2EB" />
    </LineChart>
  );
};

const PieChartComponent = () => {
  const data = [
    { name: "Event 1", attendance: 120 },
    { name: "Event 2", attendance: 200 },
    { name: "Event 3", attendance: 150 },
    { name: "Event 4", attendance: 280 },
    { name: "Event 5", attendance: 90 },
  ];

  const COLORS = ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#9966FF"];
  return (
    <PieChart width={500} height={300}>
      <Pie
        dataKey="attendance"
        isAnimationActive={true}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

const AreaChartComponent = () => {
  const data = [
    { name: "Event 1", attendance: 120 },
    { name: "Event 2", attendance: 200 },
    { name: "Event 3", attendance: 150 },
    { name: "Event 4", attendance: 280 },
    { name: "Event 5", attendance: 90 },
  ];
  return (
    <AreaChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="attendance"
        stroke="#bb84e8"
        fill="#bb84e8"
      />
    </AreaChart>
  );
};

const BarChartComponent = () => {
  const data = [
    { name: "Event 1", attendance: 120 },
    { name: "Event 2", attendance: 200 },
    { name: "Event 3", attendance: 150 },
    { name: "Event 4", attendance: 280 },
    { name: "Event 5", attendance: 90 },
  ];
  return (
    <BarChart
      className="bar-resp"
      isAnimationActive={true}
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="attendance" fill="#1bbe0f" />
    </BarChart>
  );
};

const AnalyticsComponent = () => {
  return (
    <div>
      <div className="analytics-container">
        <h2 className="Ana-head">Analytics</h2>
        <div className="chart-row">
          <div className="chart">
            <h3>Attendance Trends</h3>
            <LineChartComponent />
          </div>
          <div className="chart">
            <h3>Event Distribution</h3>
            <PieChartComponent />
          </div>
        </div>
        <div className="chart-row">
          <div className="chart">
            <h3>Performance Overview</h3>
            <AreaChartComponent />
          </div>
          <div className="chart">
            <h3>Event Statistics</h3>
            <BarChartComponent />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const bearerToken = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:8222/api/ev/getByOrgID/${localStorage.getItem(
          "orgId"
        )}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleDeleteEvent = (eventID) => {
    axios.delete(`http://localhost:8222/api/ev/del/${eventID}`, { headers });
    console.log(`Deleting event with ID ${eventID}`);
    window.location.reload();
  };

  return (
    <div className="event-list-org1">
      <h1>Upcoming Events</h1>
      <Container fluid>
        <Row>
          {events.map((event) => (
            <Col key={event.eventID} xs={12} md={6} lg={4}>
              <Card className="event-card">
                <Card.Img
                  src={daisy}
                  alt={event.name}
                  className="event-image"
                />
                <Card.Body className="event-details">
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>Date: {event.eventDate}</Card.Text>
                  <Card.Text>Location: {event.address}</Card.Text>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteEvent(event.eventID)}
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

const AddComponent = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [eventData, setEventData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    organizer: {
      name: "",
      type: "",
      orgID: localStorage.getItem("orgId"),
    },
    eventDate: null,
  });
  const [sampleData, setSampleData] = useState({});
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEventData({ ...eventData, eventDate: date });
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Hello");
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        "http://localhost:8222/api/ev/post",
        eventData,
        { headers }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const currentDate = new Date();

  return (
    <div>
      <div className="add-event-multi-step-form">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div
              className={`add-event-form-step ${
                step === 1 ? "active" : step === 2 ? "previous" : "next"
              }`}
            >
              <Label className="add-event-label">Name of the Event:</Label>
              <Input
                type="text"
                required
                className="add-event-input"
                style={{ backgroundColor: "#131313", color: "white" }}
                value={eventData.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
              />
              <Button
                type="button"
                onClick={nextStep}
                className="add-event-button"
              >
                Next
              </Button>
            </div>
          )}
          {step === 2 && (
            <div
              className={`add-event-form-step ${
                step === 2 ? "active" : step === 1 ? "previous" : "next"
              }`}
            >
              <Label className="add-event-label">Address:</Label>
              <Input
                type="text"
                required
                className="add-event-input"
                style={{ backgroundColor: "#131313", color: "white" }}
                value={eventData.address}
                onChange={(e) =>
                  setEventData({ ...eventData, address: e.target.value })
                }
              />
              <Button
                type="button"
                onClick={prevStep}
                className="add-event-button"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="add-event-button"
              >
                Next
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="add-event-form-step">
              <Label className="add-event-label">Date of Event:</Label>
              <div>
                <DatePicker
                  className="add-event-input"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={currentDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  scrollableYearDropdown
                  yearDropdownItemNumber={10}
                />
              </div>
              <Label className="add-event-label">Time of Event:</Label>
              <div className="time-picker">
                <TimePicker
                  onChange={handleTimeChange}
                  value={selectedTime}
                  disableClock={true}
                />
              </div>
              <br />
              <Label className="add-event-label">Description:</Label>
              <Input
                type="textarea"
                required
                className="add-event-input"
                style={{ backgroundColor: "#131313", color: "white" }}
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
              />
              <Button
                type="button"
                onClick={prevStep}
                className="add-event-button"
              >
                Previous
              </Button>
              <Button type="submit" className="add-event-button">
                Submit
              </Button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

const OrgDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleSidebarClick = (item) => {
    console.log(item);
    setSelectedItem(item);
  };

  return (
    <div>
      <div className="org-dashboard-container">
        <div className="sidebar">
          <AdminPannel onItemClick={handleSidebarClick} />
        </div>
        <div className="right-panel">
          {selectedItem === "Dashboard" ? (
            <DashboardComponent />
          ) : selectedItem === "Profile" ? (
            <ProfileComponent />
          ) : selectedItem === "Volunteers" ? (
            <VolunteersComponent />
          ) : selectedItem === "Analytics" ? (
            <AnalyticsComponent />
          ) : selectedItem === "Events" ? (
            <EventsComponent />
          ) : selectedItem === "Add Event" ? (
            <AddComponent />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
