import React from "react";

// import Button from "../Button";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Confirm(props) {
  const classes = useStyles();
  return (
    <main className="timeslot__card timeslot__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      {/* <section className="timeslot__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section> */}
      <div className={classes.root}>
      <Button variant="contained" color="primary">
        Cancel
      </Button>
      <Button variant="contained" color="secondary">
        Confirm
      </Button>
    </div>
    </main>
  );
}