import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Status(props) {
  const classes = useStyles();
  return (
    <main className="timeslot__card timeslot__card--status">
      <h1 className="text--semi-bold">{props.message}</h1>
      <div className={classes.root}>
        <CircularProgress color="secondary" />
      </div>
    </main>
  );
}
