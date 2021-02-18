import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { AppBar, Toolbar, Tab, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  stickToTop: {
    minHeight: '80px',
  },
});

export default function Nav(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" >
      <Toolbar className={classes.stickToTop}>
        <a href="/"><img src="images/logo.png" alt="logo" width="70" /></a>
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
