import React, { useEffect, useState } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import "./styles.scss";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
  },
}));

export default function Timeslot(props) {
  //console.log(props.slotTime + " TIMESLOT PROPS: ", props);
  let activityCategories = props.activityCategories;
  let activities = props.activities;
  let plannedActivities = props.plannedActivities;
  let dayList = props.dayList;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  // let [state, setState] = useState([
  //   { activity_categories: ["Eat"], activities: [], plannedActivities: {} },
  // ]);

  // useEffect(() => {
  //   setState(activityCategories, activities, plannedActivities);
  // }, [activityCategories, activities, plannedActivities]);

  let activityCategory =
    activityCategories &&
    activityCategories.map((cat, index) => {
      return <p key={index}>{cat.name}</p>;
    });

    // if( dayList !== undefined){
    //   let activity = activities.filter(
    //     (activity) => activity.id === plannedActivity.activity
    //   )[0];
    //   if( dayList.filter)
    // }

    
  let slotActivity = null;
  // {activity: 3, timeslot: "Morning", day: 0}
  
  // slotActivity = dayList.filter( (d => d.timeslot === props.slotTime))[0];
  slotActivity = dayList.filter( (d) => (d.timeslot === props.slotTime && d.day === props.dayIndex))[0];

  console.log("slot Activity ", slotActivity)
  
  const { mode, transition, back } = useVisualMode(
    slotActivity ? SHOW : EMPTY
  );

  // USE THIS FUNCTION WHEN PUSHING TO B-E
  // const save = (id) => {
  //   const plannedActivity = {
  //     name: "NEWLY SAVED ACTIVITY",
  //   };

  //   transition(SAVING, true);

  //   props.saveActivity(props.id, plannedActivity).then(() => transition(SHOW))
  //   .catch(() => transition(ERROR_SAVE, true));
  // };

  const saveToState = (activity) => {
    transition(SAVING, true);
    props.updateActivityTimeslot(activity, props.slotTime, props.dayIndex);
    transition(SHOW);
  };

  const cancel = () => {
    transition(DELETING, true);

    // props.deleteActivity(props.id).then(() => transition(EMPTY));
  };

  return (
    <article className="timeslot">
      <Header time={props.slotTime} />
      <Card className={classes.root}>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you would like to delete?"}
            onConfirm={cancel}
            onCancel={() => back()}
          />
        )}
        {mode === CREATE && (
          <Form
            time={props.slotTime}
            activityCategories={activityCategories}
            activities={activities}
            onSave={saveToState}
            onCancel={() => back()}
          />
        )}
        {mode === SHOW && (
          <Show
            slotActivity={slotActivity}
            activities={activities}
            activityCategories={activityCategories}
            plannedActivities={plannedActivities}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === EDIT && <h1>EDIT MODE</h1>}
      </Card>
    </article>
  );
}
