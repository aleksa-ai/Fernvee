import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Confirm(props) {
  const classes = useStyles();
  return (
    <main className="timeslot__card timeslot__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="timeslot__actions">
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            danger
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            danger
            onClick={props.onConfirm}
          >
            Confirm
          </Button>
        </div>
      </section>
    </main>
  );
}
