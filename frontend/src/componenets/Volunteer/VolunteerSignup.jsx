import React, { useState } from "react";
import "../../assets/css/Volunteer/VolunteerSignup.css";
import { FormGroup, Input, Label } from "reactstrap";
import yourLogo from "../../assets/pics/harmony-logo.png";
import Footer from "../Footer";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/UserSlice";

const VolunteerSignup = () => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [formError, setFormError] = useState("");
  const [description, setDescription] = useState("");
  const role = "USER";
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const dispatch = useDispatch();
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
  };

  const handleDateOfBirthChange = (date) => {
    setDob(date);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !gender || !dob || !state) {
      setFormError("All Fields are required");
    } else {
      const userData = {
        dob: dob.format("YYYY-MM-DD"),
        username,
        password,
        gender,
        state,
        description,
        role,
        name,
      };

      axios
        .post("http://localhost:8222/api/auth/register", userData)
        .then((response) => {
          if (response.data.message === "Username already exists") {
            console.log("already exists");
            setFormError("Username already exists");
          } else {
            console.log("Signup successful:", response.data);
            const token = response.data.token;
            const isNewUser = response.data.newUser;
            const orgID = response.data.orgID;

            localStorage.setItem("isNewUser", isNewUser);
            localStorage.setItem("token", token);
            localStorage.setItem("orgId", orgID);
            localStorage.setItem("role", role);
            console.log(localStorage.getItem("isNewUser"));
            dispatch(login(username));
            navigate("/volunteer/explore");
          }
        })
        .catch((error) => {
          console.error("Error signing up:", error);
        });
    }
  };

  const navigate = useNavigate();
  const handleCreateAccountClick = (e) => {
    navigate("/volunteer/login");
  };
  const [name, setname] = useState();
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
                      id="name"
                      className="form-control"
                      autoComplete="off"
                      autoFocus
                      required
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                    <label className="floating-label">Full Name</label>
                  </div>
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
                    <Label for="gender">Gender</Label>
                    <Input
                      type="select"
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="dob">Date of Birth</Label>
                    <br />
                    <DatePicker
                      id="dob"
                      selected={dob}
                      onChange={handleDateOfBirthChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Date of Birth"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      maxDate={new Date()}
                    />
                  </FormGroup>

                  <div className="floating-label-group">
                    <input
                      style={{ marginTop: "25px" }}
                      type="text"
                      id="state"
                      className="form-control"
                      autoComplete="off"
                      autoFocus
                      required
                      value={state}
                      onChange={handleStateChange}
                    />
                    <label className="floating-label">State</label>
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

export default VolunteerSignup;
