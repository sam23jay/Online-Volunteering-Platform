import React, { useState } from "react";
import "../assets/css/Signup.css";
import { Button, Form, Input } from "reactstrap";
import bg from "./bg.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
    dob: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.mobile ||
      !formData.gender ||
      !formData.dob
    ) {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage("");
      console.log(formData);
      navigate("/login");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={bg} alt="Background" />
      </div>
      <div className="signup-form-container">
        <Form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
          <div className="form-group">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <Input
              type="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Date of Birth"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-position-signup">
            <Button className="sign-up-button" type="submit">
              Sign Up
            </Button>
          </div>
          <p onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
