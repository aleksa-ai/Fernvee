import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Show(props) {
  const classes = useStyles();
  return (
    <main className="timeslot__card timeslot__card--show">
      <section className="timeslot__card-left">
        <h2 className="text--regular">Jules Verne</h2>
        <h4 className="text--light">7:30 pm - 9:00 pm</h4>
        <section className="interviewer">
          <h5 className="text--light">Avenue Gustave Eiffel, 75007 Paris, France</h5>
          <h3 className="text--regular">+33 1 45 55 61 44</h3>
          <h4 className="text--regular"><a href='restaurants-toureiffel.com'>restaurants-toureiffel.com</a></h4>
          <h6 className="text--light">Book way ahead (online only) to feast on Michelin-starred cuisine by Frédéric Anton and the most beautiful view of Paris at this magical spot on the Eiffel Tower's 2nd floor, accessed by a private lift.</h6>
        </section>
      </section>
      <section className="timeslot__card-right">
        {/* <section className="timeslot__actions">
          <img
            className="timeslot__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="timeslot__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={() => props.onDelete()}
          />
        </section> */}
        <div className={classes.root}>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
      </section>
    </main>
  );
}


