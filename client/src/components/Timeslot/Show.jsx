import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Show(props) {
  console.log("SHOW PROPS:", props);

  let dayList = props.dayList;
  let firstPlannedActivity = dayList["0"];

  let activities = props.activities;
  let activity = activities.filter(
    (activity) => activity.id === firstPlannedActivity.activity
  )["0"];

  const classes = useStyles();
  return (
    <main className="timeslot__card timeslot__card--show">
      <section className="timeslot__card-left">
        <h1 className="text--regular">{activity.name}</h1>
        <h5 className="text--light">{firstPlannedActivity.timeslot}</h5>
        <h5 className="text--light">{activity.address}</h5>
        <h5 className="text--regular">{activity.phone}</h5>
        <h5 className="text--light">
          <a href={activity.website_url}>{activity.website_url}</a>
        </h5>
        <h6 className="text--light">{activity.description}</h6>
      </section>
      <section className="timeslot__card-right">
        <section className="timeslot__actions">
          <div className={classes.root}>
            <IconButton aria-label="edit" onClick={props.onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => props.onDelete()}>
              <DeleteIcon />
            </IconButton>
          </div>
        </section>
      </section>
    </main>
  );
}
