import React, { useEffect, useState } from "react";
import "../assets/css/LoginOrg.css"; // Create a CSS file for your login page styles
import { Label } from "reactstrap";
import yourLogo from "../assets/pics/harmony-logo.png"; // Replace with the actual path to your logo
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/UserSlice";
import { setLoggedIn } from "./useAuthentication";
import axios from "axios";
const OrgLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const role = "ADMIN";
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "ADMIN"
    ) {
      navigate("/org/dashboard");
    }
  }, []);
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8222/api/auth/authenticate",
        {
          username,
          password,
          role,
        }
      );
      console.log("Response:", response); // Log the entire response object

      const token = response.data.token;
      const orgId = response.data.orgID;
      const message = response.data.message;
      if (message === "Login Successful") {
        localStorage.setItem("token", token);
        localStorage.setItem("orgId", orgId);
        localStorage.setItem("role", role);
        setLoggedIn(true);
        dispatch(logout(username));
        dispatch(login(username));
        console.log(`Login Successful+${localStorage.getItem("token", token)}`);
        navigate("/org/dashboard");
      } else {
        console.log("Login Failed");
        setPassword("");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      setPassword("");
    }
  };

  const handleCreateAccountClick = (e) => {
    navigate("/org/signup");
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
              <div className="logo-text">Harmony</div> {/* Add this */}
            </div>
            <div className="abov-text">
              <h3>Welcome to Harmony!👋🏻</h3>
              <p>Please Sign-in to your account and start your adventure</p>
            </div>
            <form>
              <div class="row">
                <div class="col-xs-4 col-xs-offset-4">
                  <div class="floating-label-group">
                    <input
                      type="text"
                      id="username"
                      class="form-control"
                      autocomplete="off"
                      autofocus
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />{" "}
                    <label class="floating-label">Username</label>
                  </div>

                  <div class="floating-label-group">
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      class="form-control"
                      autocomplete="off"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label class="floating-label">Password</label>
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

export default OrgLogin;
