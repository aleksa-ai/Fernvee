import React from "react";
import Timeslot from "./Timeslot/index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(15),
    textAlign: "center",
  },
}));

export default function CenteredGrid(props) {
  console.log("DLI Props", props);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} align="center" justify="center">
        <Grid item xs={12}>
          <Timeslot
            slotTime="Morning"
            dayIndex={props.dayIndex}
            activityCategories={props.activityCategories}
            activities={props.activities}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeslot={props.updateActivityTimeslot}
          />
        </Grid>
        <Grid item xs={12}>
          <Timeslot
            slotTime="Afternoon"
            dayIndex={props.dayIndex}
            activityCategories={props.activityCategories}
            activities={props.activities}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeslot={props.updateActivityTimeslot}
          />
        </Grid>
        <Grid item xs={12}>
          <Timeslot
            slotTime="Evening"
            dayIndex={props.dayIndex}
            activityCategories={props.activityCategories}
            activities={props.activities}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeslot={props.updateActivityTimeslot}
          />
        </Grid>
      </Grid>
    </div>
  );
}
