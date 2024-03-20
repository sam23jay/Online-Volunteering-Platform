import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import "../../assets/css/Volunteer/Feedback.css";
import Footer from "../Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";

const questions = [
  "How likely are you to recommend our platform to a friend or colleague?",
  "How often do you encounter technical issues while using our platform?",
  "How easy is it to find and enroll in volunteering events on our platform?",
  "How meaningful and fulfilling are the volunteering events you've participated in through our platform?",
  "Are you satisfied with the information provided about the volunteering events on our platform?",
  "How would you rate the communication between organizers and volunteers through our platform?",
  "Do you feel well-supported by our platform and the organizers of the events you've participated in?",
];

// Define options for each question
const options = [
  ["Never", "Not Likely", "Neutral", "Likely", "Definitely"],
  ["Never", "Not Often", "Occasionaly", "Often", "Very Often"],
  ["Very Difficult", "Difficult", "Neutral", "Easy", "Very Easy"],
  ["Not at all", "Little", "Neutral", "Somewhat", "Very"],
  ["Not at all", "Little", "Neutral", "Somewhat", "Very"],
  ["Bad", "Not Good", "Average", "Good", "Very Good"],
  ["Never", "Not Often", "Neutral", "Slightly Yes", "Definitely"],
];

const Feedback = () => {
  const user = useSelector(selectUser);
  const uname = user.user.email;
  const [answers, setAnswers] = useState(Array(questions.length).fill("")); // Initialize an array to hold answers

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can now access the selected answers in the 'answers' state variable
    console.log("Selected answers:", answers);

    // Define a uname (you can replace this with your actual uname)

    // Loop through questions and send an Axios POST request for each question
    questions.forEach((question, index) => {
      const answer = answers[index];
      const data = {
        uname,
        question,
        answer,
      };
      axios
        .post("http://localhost:8222/feedback/add", data)
        .then((response) => {
          console.log("Posted feedback for question:", response.data);
        })
        .catch((error) => {
          console.error("Error posting feedback:", error);
        });
      console.log(data);
      // Replace the URL with your actual backend API endpoint
    });
  };

  return (
    <div>
      <div className="feedback-container">
        <h1 style={{ fontWeight: "bolder" }}>Feedback</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div className="question-container" key={index}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  className="question"
                  style={{ color: "white" }}
                >
                  {question}
                </FormLabel>
                <RadioGroup
                  row
                  name={`question${index}`}
                  value={answers[index]} // Set the value to the corresponding answer
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  {options[index].map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio sx={{ color: "violet" }} />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
