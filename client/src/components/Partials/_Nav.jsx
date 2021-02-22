import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { AppBar, Toolbar, Tab, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExploreIcon from '@material-ui/icons/Explore';

import { useCookies } from "react-cookie"


const useStyles = makeStyles({
  stickToTop: {
    minHeight: '80px'
 
  },
});



export default function Nav(props) {
  const classes = useStyles();
  const [cookies, removeCookie] = useCookies(['cookie-name']);

  console.log(cookies.name)

  const logout = (cookies) => {
    removeCookie("id")
    removeCookie("name")
    window.location = "/" 
  }

  return (
    <AppBar position="fixed" >
      <Toolbar className={classes.stickToTop}>
        <a href="/"><img src="../images/logo.png" alt="logo" width="70%" /></a>
        <Tab label="Explore" icon={<ExploreIcon/>} component={NavLink} to="/" /> 
        <Tab label="Trips" component={NavLink} to="/trips" />
        <Tab label="Create" component={NavLink} to="/create" />
        <Tab label="My Profile" component={NavLink} to="/MyProfile" />
        <Tab label="Login" component={NavLink} to="/login" />
        <Tab label="Logout"  onClick={logout}/>
        <Tab label="Signup" component={NavLink} to="/signup" />
      </Toolbar>
    </AppBar>
  );
}
