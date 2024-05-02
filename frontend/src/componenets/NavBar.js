import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/NavBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/pics/harmony-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "./redux/UserSlice";
import { Button } from "reactstrap";
import { getLoggedIn } from "./useAuthentication";

function NavBar() {
  const user = useSelector(selectUser);
  const username = user.user.email;
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(logout(username));
    navigate("/");
  };
  const handleClick = () => setClick(!click);

  const isLoggedIn = getLoggedIn();

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink
            exact
            to="/"
            className="nav-logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="proj-title" />
            Harmony
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            {localStorage.getItem("token") && (
              <li>
                <Button className="log-out-red" onClick={handleLogOut}>
                  Logout
                </Button>
              </li>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <MenuIcon style={{ fontSize: "30px" }} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
