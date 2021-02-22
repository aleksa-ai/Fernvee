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
import MapIcon from '@material-ui/icons/Map';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';

import { useCookies } from "react-cookie"


const useStyles = makeStyles({
  stickToTop: {
    minHeight: '80px'
 
  },
});



export default function Nav(props) {
  const classes = useStyles();
  const [cookies, removeCookie] = useCookies();

  console.log("USER NAME", cookies.name, "USER ID", cookies.id, "COOKIE", cookies)

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
        <Tab label="Trips" icon={<MapIcon/>} component={NavLink} to="/trips" />
        <Tab label="Create" icon={<CreateIcon/>} component={NavLink} to="/create" />
        <Tab label="My Profile" icon={<AccountCircleSharpIcon/>} component={NavLink} to="/MyProfile" />
        {cookies.id === "undefined" ? <Tab label="Login" icon={<LockSharpIcon/>} component={NavLink} to="/login" /> : <Tab label="Logout"  icon={<LockOpenSharpIcon/>} onClick={logout}/>}
        <Tab label="Signup" icon={<AssignmentTurnedInSharpIcon/>} component={NavLink} to="/signup" />
      </Toolbar>
    </AppBar>
  );
}
