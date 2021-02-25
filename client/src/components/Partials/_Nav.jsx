import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { AppBar, Toolbar, Tab, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExploreIcon from "@material-ui/icons/Explore";
import MapIcon from "@material-ui/icons/Map";
import CreateIcon from "@material-ui/icons/Create";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import LockOpenSharpIcon from "@material-ui/icons/LockOpenSharp";
import AssignmentTurnedInSharpIcon from "@material-ui/icons/AssignmentTurnedInSharp";

import { useCookies } from "react-cookie";

import "./_Nav.scss";

const useStyles = makeStyles({
  stickToTop: {
    minHeight: "80px",
  },
});

export default function Nav(props) {
  const classes = useStyles();
  const [cookies, removeCookie] = useCookies();

  console.log(
    "USER NAME",
    cookies.name,
    "USER ID",
    cookies.id,
    "COOKIE",
    cookies
  );

  const logout = (cookies) => {
    removeCookie("id");
    removeCookie("name");
    window.location = "/";
  };

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.stickToTop}>
        <div class="main-nav-buttons">
          <a href="/">
            <img src="../images/logo.png" class="logo" alt="logo" />
          </a>
          <Tab
            label="Explore"
            icon={<ExploreIcon fontSize="large" />}
            component={NavLink}
            to="/"
          />
          <Tab
            label="Create"
            icon={<CreateIcon fontSize="large" />}
            component={NavLink}
            to="/create"
          />
          <Tab
            label="Trips"
            icon={<MapIcon fontSize="large" />}
            component={NavLink}
            to="/trips"
          />
        </div>
        {/* <Tab label="My Profile" icon={<AccountCircleSharpIcon fontSize="large"/>} component={NavLink} to="/MyProfile" /> */}
        {cookies.id === "undefined" ? (
          <Tab
            label="Login"
            icon={<LockSharpIcon fontSize="large" />}
            component={NavLink}
            to="/login"
          />
        ) : (
          <Tab
            label="Logout"
            icon={<LockOpenSharpIcon fontSize="large" />}
            onClick={logout}
          />
        )}
        {cookies.id === "undefined" ? (
          <Tab
            label="Signup"
            icon={<AssignmentTurnedInSharpIcon fontSize="large" />}
            component={NavLink}
            to="/signup"
          />
        ) : <Tab label={"Hi " + cookies.name + "!" } icon={<AccountCircleSharpIcon fontSize="large" />} component={NavLink} to="/" />}
      </Toolbar>
    </AppBar>
  );
}
