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
  let activityCategories = props.activityCategories;
  let activities = props.activities;
  let plannedActivities = props.plannedActivities;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //console.log("TIMESLOT Plan'd Act:", plannedActivities)

  // let [state, setState] = useState([
  //   { activity_categories: ["Eat"], activities: [], plannedActivities: {} },
  // ]);

  // useEffect(() => {
  //   setState(activityCategories, activities, plannedActivities);
  // }, [activityCategories, activities, plannedActivities]);

  console.log("TIMESLOT props:", props);
  //console.log("TIMESLOT Plan'd Act 2:", plannedActivities['1'].planned_activity)

  let activityCategory =
    activityCategories &&
    activityCategories.map((cat, index) => {
      return <p key={index}>{cat.name}</p>;
    });

  // let showActivities = activities && activities.map((act, index) => {
  //   return <Show key={act.id} {...act} onDelete={() => transition(CONFIRM)} />;
  // });

  // let showFirstActivtiy = showActivities ? showActivities[0] : null ;

  const { mode, transition, back } = useVisualMode(
    !plannedActivities ? SHOW : EMPTY
  );

  const save = (id) => {
    const plannedActivity = {
      name: "NEWLY SAVED ACTIVITY",
    };

    transition(SAVING, true);

    props.saveActivity(props.id, plannedActivity).then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  };

  const cancel = () => {
    transition(DELETING, true);

    props.deleteActivity(props.id).then(() => transition(EMPTY));
    //.catch(() => transition(ERROR_DELETE, true));
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
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === SHOW && (
          <Show
            activities={activities}
            activityCategories={activityCategories}
            plannedActivities={plannedActivities}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === EDIT && <h1>EDIT MODE</h1>}
        {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment."} onClose={() => back()} />
      )}
      </Card>
    </article>
  );
}
