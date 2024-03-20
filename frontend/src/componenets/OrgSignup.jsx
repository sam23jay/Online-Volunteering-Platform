import React, { useState } from "react";
import "../assets/css/OrgSignup.css";
import { FormGroup, Input, Label } from "reactstrap";
import yourLogo from "../assets/pics/harmony-logo.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const OrgSignup = () => {
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const role = "ADMIN";
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !type || !name) {
      setFormError("All Fields are required");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8222/api/auth/register",
          {
            type,
            name,
            username,
            password,
            description,
            role,
          }
        );
        if (response.data.message === "Username already exists") {
          console.log("already exists");
          setFormError("Username already exists");
        } else {
          const token = response.data.token;
          localStorage.setItem("token", token);

          console.log("Form submitted successfully!");
          console.log("Received token:", localStorage.getItem("token"));
          navigate("/org/login");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };
  const handleCreateAccountClick = (e) => {
    e.preventDefault();
    navigate("/org/login");
  };
  return (
    <div>
      <div className="sign-up-vol-sign-up-page">
        <div className="sign-up-vol-background-image"></div>
        <div className="sign-up-vol-sign-up-container">
          <div className="beaut-text">
            <div className="logo-and-text">
              <img
                src={yourLogo}
                alt="Your Logo"
                className="sign-up-vol-logo"
                style={{ width: "60px", height: "auto", marginBottom: "20px" }}
              />
              <div className="logo-text">Harmony</div>
            </div>
            <div className="abov-text">
              <h3>Welcome to Harmony!👋🏻</h3>
              <p>
                Unlock the door to limitless journeys! Join us now and be part
                of this amazing experience.
              </p>
            </div>
            <form onSubmit={handleSignupSubmit}>
              <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                  <div className="floating-label-group">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      autoComplete="off"
                      autoFocus
                      required
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <label className="floating-label">Username</label>
                  </div>

                  <div className="floating-label-group">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      autoComplete="off"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <label className="floating-label">Password</label>
                  </div>

                  <FormGroup>
                    <Label for="type">Type</Label>
                    <Input
                      type="select"
                      name="type"
                      id="type"
                      value={type}
                      onChange={handleTypeChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Healthcare">Animal Care</option>
                      <option value="Environmental Care">
                        Environmental Care
                      </option>
                    </Input>
                  </FormGroup>

                  <div className="floating-label-group">
                    <input
                      style={{ marginTop: "25px" }}
                      type="text"
                      id="name"
                      className="form-control"
                      autoComplete="off"
                      autoFocus
                      required
                      value={name}
                      onChange={handleNameChange}
                    />
                    <label className="floating-label">Name</label>
                  </div>
                  <div className="floating-label-group">
                    <Label className="add-event-label">Description:</Label>
                    <Input
                      type="textarea"
                      required
                      className="add-event-input"
                      style={{ backgroundColor: "#131313", color: "white" }}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <p className="error-text" style={{ color: "red" }}>
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="sign-up-vol-btn"
                onClick={handleSignupSubmit}
              >
                Sign Up
              </button>

              <p style={{ textAlign: "center" }}>
                Already have an account?
                <p
                  style={{ color: "blue" }}
                  className="link-sign-up"
                  onClick={handleCreateAccountClick}
                >
                  Log in instead.
                </p>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrgSignup;
