import React, { useState, useEffect } from "react";
import "../assets/css/RightPanel.css";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/UserSlice";

const RightPanel = () => {
  const user = useSelector(selectUser);
  const orgname = user.user && user.user.email ? user.user.email : "Guest";

  const [numEvents, setNumEvents] = useState(0);
  const [numVolunteersEnrolled, setNumVolunteersEnrolled] = useState(0);
  const [maxNumVolunteers, setMaxNumVolunteers] = useState(0);

  const events = [
    {
      id: 1,
      name: "Event 1",
      volunteersEnrolled: 25,
    },
    {
      id: 2,
      name: "Event 2",
      volunteersEnrolled: 40,
    },
    {
      id: 3,
      name: "Event 3",
      volunteersEnrolled: 15,
    },
  ];

  const volunteers = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Volunteer ${index + 1}`,
  }));

  useEffect(() => {
    const incrementNumbers = () => {
      let eventsCounter = 0;
      let volunteersEnrolledCounter = 0;
      let maxVolunteersCounter = 0;

      const interval = setInterval(() => {
        if (eventsCounter <= 3) {
          setNumEvents(eventsCounter);
          eventsCounter++;
        }
        if (volunteersEnrolledCounter <= 50) {
          setNumVolunteersEnrolled(volunteersEnrolledCounter);
          volunteersEnrolledCounter++;
        }
        if (maxVolunteersCounter <= 100) {
          setMaxNumVolunteers(maxVolunteersCounter);
          maxVolunteersCounter++;
        }

        if (
          eventsCounter > 3 &&
          volunteersEnrolledCounter > 50 &&
          maxVolunteersCounter > 100
        ) {
          clearInterval(interval);
        }
      }, 20);
    };

    incrementNumbers();
  }, []);

  return (
    <div className="">
      <div className="org-welcome">
        <h1 className="welcome-title">Welcome, {orgname}!</h1>
      </div>
      <div className="org-info-box">
        <div className="info-list">
          <div className="info-item hoverable">
            <h2>No. of Events</h2>
            <p>{numEvents}</p>
          </div>
          <div className="info-item hoverable">
            <h2>No. of Volunteers Enrolled</h2>
            <p>{numVolunteersEnrolled}</p>
          </div>
          <div className="info-item hoverable">
            <h2>Max No. of Volunteers Possible</h2>
            <p>{maxNumVolunteers}</p>
          </div>
        </div>
      </div>
      <div className="org-events-and-volunteers">
        <div className="org-event-box">
          <div className="event-list">
            <p className="event-header">Events List</p>
            {events.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-name">{event.name}</div>
                <div className="volunteers-enrolled">
                  {event.volunteersEnrolled} Volunteers Enrolled
                </div>
              </div>
            ))}
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
      </div>
    </div>
  );
};

export default RightPanel;
