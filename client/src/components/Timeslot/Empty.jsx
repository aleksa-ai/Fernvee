import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
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
    // <main className="timeslot__add">
    //   <img
    //     className="timeslot__add-button"
    //     src="images/add.png"
    //     alt="Add"
    //     // onClick={props.onAdd}
    //   />
    // </main>
    <div className={classes.root}>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}