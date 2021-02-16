import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Empty(props) {
  const classes = useStyles();
  return (
    <main className="timeslot__add">
      <div className={classes.root}>
        <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </main>
  );
}
