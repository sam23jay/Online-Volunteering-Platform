import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./componenets/Signup";
import OrgDashboard from "./componenets/OrgDashboard";
import Store from "./componenets/redux/Store";
import { Provider } from "react-redux";
import PrivacyPolicy from "./componenets/PrivacyPolicy";
import TermsAndConditions from "./componenets/TermsAndConditions";
import Home from "./componenets/Home";
import Navbar from "./componenets/NavBar";
import Explore from "./componenets/Volunteer/Explore";
import Profile from "./componenets/Volunteer/Profile";
import LoginVolunteer from "./componenets/Volunteer/LoginVolunteer";
import VolunteerSignup from "./componenets/Volunteer/VolunteerSignup";
import OrgSignup from "./componenets/OrgSignup";
import OrgLogin from "./componenets/OrgLogin";
import AboutUs from "./componenets/AboutUs";
import FAQ from "./componenets/FAQ";
import EventPage from "./componenets/Volunteer/EventPage";
import VolunteerProfile from "./componenets/VolunteerProfile";
import Feedback from "./componenets/Volunteer/Feedback";
import DragAndDrop from "./componenets/DragAndDrop";
const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.includes(userRole)) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};
function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/drag" element={<DragAndDrop />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/org/dashboard"
              element={
                <PrivateRoute element={OrgDashboard} allowedRoles={["ADMIN"]} />
              }
            />
            <Route
              path="/org/volunteer/:volID"
              element={
                <PrivateRoute
                  element={VolunteerProfile}
                  allowedRoles={["ADMIN"]}
                />
              }
            />
            <Route
              path="/volunteer/explore"
              element={
                <PrivateRoute element={Explore} allowedRoles={["USER"]} />
              }
            />
            <Route
              path="/volunteer/profile"
              element={
                <PrivateRoute element={Profile} allowedRoles={["USER"]} />
              }
            />
            <Route
              path="/volunteer/event/:eventID"
              element={
                <PrivateRoute element={EventPage} allowedRoles={["USER"]} />
              }
            />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route
              path="/volunteer/feedback/"
              element={
                <PrivateRoute element={Feedback} allowedRoles={["USER"]} />
              }
            />{" "}
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/volunteer/login" element={<LoginVolunteer />} />
            <Route path="/org/login" element={<OrgLogin />} />
            <Route path="/volunteer/signup" element={<VolunteerSignup />} />
            <Route path="/org/signup" element={<OrgSignup />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
