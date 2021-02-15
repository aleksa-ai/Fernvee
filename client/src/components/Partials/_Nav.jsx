import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { AppBar, Toolbar, Tab } from "@material-ui/core";


export default function Nav(props) {
  return (
    <AppBar position="static" >
      <Toolbar>
        <Tab label="Explore" component={NavLink} to="/" />
        <Tab label="Trips" component={NavLink} to="/trips" />
        <Tab label="Create" component={NavLink} to="/create" />
        <Tab label="My Profile" component={NavLink} to="/MyProfile" />
        <Tab label="Login" component={NavLink} to="/login" />
        <Tab label="Logout" component={NavLink} to="/logout" />
        <Tab label="Signup" component={NavLink} to="/signup" />
      </Toolbar>
    </AppBar>
  );
}
