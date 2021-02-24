import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#F4F4F4",
  },
}));
export default function Header(props) {
  const classes = useStyles();
  return (
    <Typography color="primary" variant="h6" component="span">
      <header className={classes.root}>
        <h4 className="text--semi-bold">{props.time}</h4>
        <hr className="timeslot__separator" />
      </header>
    </Typography>
  );
}
