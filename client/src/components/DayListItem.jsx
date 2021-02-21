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
  // console.log("DAY LIST ITEM PROPS:", props);
  const classes = useStyles();
  const daySlots = props.daySlots;


  return (
    <div className={classes.root}>
      <Grid container spacing={4} align="center" justify="center">
        <Grid item xs={12}>

          <Timeslot
            activityCategories={props.activityCategories}
            activities={props.activities}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeSlot={props.updateActivityTimeSlot}
            slot={daySlots[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <Timeslot
            activityCategories={props.activityCategories}
            activities={props.activities}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeSlot={props.updateActivityTimeSlot}
            slot={daySlots[1]}
          />
        </Grid>
        <Grid item xs={12}>
          <Timeslot
            activityCategories={props.activityCategories}
            activities={props.activities}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeSlot={props.updateActivityTimeSlot}
            slot={daySlots[2]}
          />
        </Grid>
      </Grid>      
    </div>
  );
}
