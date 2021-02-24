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
    width: "100%",

  },
}));

export default function Timeslot(props) {
 
  let activityCategories = props.activityCategories;
  let activities = props.activities;
  let plannedActivities = props.plannedActivities;
  let slot = props.slot;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let activityCategory =
    activityCategories &&
    activityCategories.map((cat, index) => {
      return <p key={index}>{cat.name}</p>;
  });

 
  const { mode, transition, back } = useVisualMode(
    slot.activity !== null ? SHOW : EMPTY
  );

  const saveToState = (activity) => {
    slot.activity = activity;
    transition(SAVING, true);
    props.updateActivityTimeSlot(slot);
    transition(SHOW);
  };

  const remove = () => {
    slot.activity = null;
    transition(EMPTY);
  };

  return (
    // <article className={classes.root}>
    <div className={classes.root}> 
      <Header time={slot.timeslot}/>
      <Card>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you would like to delete?"}
            onConfirm={remove}
            onCancel={() => back()}
          />
        )}
        {mode === CREATE && (
          <Form
            activityCategories={activityCategories}
            activities={activities}
            onSave={saveToState}
            onCancel={() => back()}
          />
        )}
        {mode === SHOW && (
          <Show
            slot={slot}
            activities={activities}
            activityCategories={activityCategories}
            plannedActivities={plannedActivities}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === EDIT && <h1>EDIT MODE</h1>}
      </Card>
      </div>
    // </article>
  );
}
