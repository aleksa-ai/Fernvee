import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  stickToBottom: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Fernvee, Inc. All rights reserved</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.stickToBottom}
    >
      {/* <Copyright className={classes.stickToBottom}/> */}
      <BottomNavigationAction label="About Us" component={Link} to="/AboutUs" />
      <BottomNavigationAction label="Blog" component={Link} to="/Blog" />
      <BottomNavigationAction
        label="Contact Us"
        component={Link}
        to="/ContactUs"
      />
    </BottomNavigation>
  );
}
