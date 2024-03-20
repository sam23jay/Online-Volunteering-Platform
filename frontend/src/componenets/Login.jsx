import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Login.css";
import { useDispatch } from "react-redux";
import { login } from "./redux/UserSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, togglePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = (event) => {
    if (!username || !password) {
      setErrorMessage("Enter both username and password");
    } else {
      setErrorMessage("");
      dispatch(login(username));
      setTimeout(() => {
        setLoginSuccess(true);
      }, 0);
      setTimeout(() => {
        navigate("/homeD");
      }, 2000);
    }
  };

  return (
    <div>
      <div className="login-page-container">
        <Form onSubmit={handleLogin}>
          <div className="form-container">
            <div className="login-form">
              <div className="login-heading">Log in</div>
              <Input
                type="text"
                className="username-input"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type={showPassword ? "text" : "password"}
                className="password-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
              <div className="checkbox-container">
                <label>
                  <Input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={showPassword}
                    onChange={() => togglePassword(!showPassword)}
                  />
                  Show Password
                </label>
              </div>
              <div className="checkbox-container">
                <label>
                  <Input type="checkbox" className="custom-checkbox" />
                  Remember me
                </label>
              </div>
              <Button onClick={handleLogin} className="login-button">
                Login
              </Button>
              <p className="signup-link" onClick={() => navigate("/signup")}>
                Don't have an account? Sign Up
              </p>
            </div>
          </div>
        </Form>
      </div>
      {loginSuccess && (
        <div className="login-success-popup">
          <p>Login Successful!</p>
        </div>
      )}
    </div>
  );
};

export default Login;
