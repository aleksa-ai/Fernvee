import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  stickToBottom: {
    bottom: 20,
  },
});

export default function Footer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <BottomNavigation
   
    position="sticky"
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    showLabels
    className={classes.stickToBottom} 
  >
  
      <BottomNavigationAction label="About Us" component={Link} to="/AboutUs" />
      <BottomNavigationAction label="Blog" component={Link} to="/Blog" />
      <BottomNavigationAction label="Contact Us" component={Link} to="/ContactUs" />
    </BottomNavigation>
  );
}
