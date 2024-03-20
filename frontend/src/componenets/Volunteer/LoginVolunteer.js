import React, { useEffect, useState } from "react";
import "../../assets/css/Volunteer/LoginVolunteer.css";
import { Label } from "reactstrap";
import yourLogo from "../../assets/pics/harmony-logo.png";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/UserSlice";
import { setLoggedIn } from "../useAuthentication";
import axios from "axios";
import tay from "../../assets/pics/tay.webp";

const LoginVolunteer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  const role = "USER";
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "USER"
    ) {
      navigate("/volunteer/explore");
    }
  }, []);
  const handleSignIn = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8222/api/auth/authenticate",
        {
          username,
          password,
          role,
        }
      );
      const message = response.data.message;

      if (message === "Login Failed") {
        setPassword("");

        setErrors({ login: "Invalid username or password" });
      } else {
        const token = response.data.token;
        const orgId = response.data.orgID;
        localStorage.setItem("token", token);
        localStorage.setItem("orgId", orgId);
        localStorage.setItem("role", role);
        const isnew = response.data.newUser;
        localStorage.setItem("isNewUser", isnew);
        console.log(isnew);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const resp = axios.put(
          `http://localhost:8222/api/vol/updateIsNewUser/${localStorage.getItem(
            "orgId"
          )}`,
          { newUser: false },
          { headers }
        );
        localStorage.setItem("isNewUser", isnew);

        console.log(`new?:${localStorage.getItem("isNewUser")}`);
        dispatch(login(username));

        setLoggedIn(true);
        navigate("/volunteer/explore");
      }
    } catch (error) {
      console.error("Error signing in:", error);

      setPassword("");

      setErrors({ login: "Invalid username or password" });
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/volunteer/signup");
  };

  const skillsList = [
    {
      id: 1,
      name: "Caring",
      image: tay,
    },
    {
      id: 2,
      name: "Exercise",
      image: tay,
    },
    {
      id: 3,
      name: "Exercise3",
      image: tay,
    },
    {
      id: 4,
      name: "Exercise4",
      image: tay,
    },
    {
      id: 5,
      name: "Exercise5",
      image: tay,
    },
    {
      id: 6,
      name: "Exercise6",
      image: tay,
    },
    {
      id: 7,
      name: "Exercise7",
      image: tay,
    },
    {
      id: 8,
      name: "Exercise8",
      image: tay,
    },
  ];

  const toggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  return (
    <div>
      <div className="login-vol-login-page">
        <div className="login-vol-background-image"></div>
        <div className="login-vol-login-container">
          <div className="beaut-text">
            <div className="logo-and-text">
              <img
                src={yourLogo}
                alt="Your Logo"
                className="login-vol-logo"
                style={{ width: "60px", height: "auto", marginBottom: "20px" }}
              />
              <div className="logo-text">Harmony</div>
            </div>
            <div className="abov-text">
              <h3>Welcome to Harmony!👋🏻</h3>
              <p>Please Sign-in to your account and start your adventure</p>
            </div>
            <form>
              <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                  <div className="floating-label-group">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      autoFocus
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <label className="floating-label">Username</label>
                  </div>

                  <div className="floating-label-group">
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      className="form-control"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label className="floating-label">Password</label>
                  </div>
                </div>
              </div>
              <div className="login-vol-form-group">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="login-vol-checkbox"
                  onClick={() => {
                    setShow(!show);
                  }}
                />
                <Label style={{ fontWeight: "normal", marginLeft: "5px" }}>
                  Show Password
                </Label>
              </div>
              {errors.username && (
                <p style={{ color: "red" }} className="error">
                  {errors.username}
                </p>
              )}
              {errors.password && (
                <p style={{ color: "red" }} className="error">
                  {errors.password}
                </p>
              )}

              {showSkillsPopup && (
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
                        {selectedSkills.map((skillId) => (
                          <div key={skillId} className="selected-skill">
                            <img
                              src={
                                skillsList.find((skill) => skill.id === skillId)
                                  ?.image
                              }
                              alt={
                                skillsList.find((skill) => skill.id === skillId)
                                  ?.name
                              }
                              className="selected-skill-image"
                            />
                            {
                              skillsList.find((skill) => skill.id === skillId)
                                ?.name
                            }
                            <span
                              className="remove-skill"
                              onClick={() => toggleSkill(skillId)}
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
                            selectedSkills.includes(skill.id) ? "active" : ""
                          }`}
                          onClick={() => toggleSkill(skill.id)}
                        >
                          <img
                            src={skill.image}
                            alt={skill.name}
                            className="skill-image"
                          />
                          <div className="skill-text">
                            <p>{skill.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="close-popup-btn-loc">
                      <button className="close-popup-btn">Submit</button>
                    </div>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="login-vol-btn"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <p style={{ textAlign: "center" }}>
                New on our platform?
                <p
                  style={{ color: "blue" }}
                  className="link-sign-up"
                  onClick={handleCreateAccountClick}
                >
                  Create an Account
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

export default LoginVolunteer;
