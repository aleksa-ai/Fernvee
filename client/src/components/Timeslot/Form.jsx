import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Form(props) {
  console.log('FORM PROPS', props)

  let activityCategories = props.activityCategories;
  let activities = props.activities;

  const classes = useStyles();
  const [catOfThings, setCatOfThings] = useState(
    activityCategories[0].name
  );

  const [thingToDo, setThingToDo] = useState(
    // props.activityCategories[0].activities[0]
    []
  );

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date("2021-02-16")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date("2021-02-17")
  );

  const handleCategoryChange = (categoryEvent) => {
    const newCategory = categoryEvent.target.value;
    const firstActivity = activityCategories.find(
      (category) => category.name === newCategory
    ).activities[0];
    setCatOfThings(newCategory);
    setThingToDo(firstActivity);
  };

  const handleActivityChange = (event) => {
    const newActivity = event.target.value;
    setThingToDo(newActivity);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const [error, setError] = useState("");
  const reset = () => {
    //props.onCancel();
    setCatOfThings(activityCategories[0].name);
    //setThingToDo(null);
  };

  function validate() {
    if (catOfThings === "") {
      setError("An activity category must be selected");
      return;
    }

    if (thingToDo === null) {
      setError("An activity must be selected");
      return;
    }
    setError("");
    //props.onSave(catOfThings, thingToDo);
  }

  return (
    <main className="timeslot__card timeslot__card--create">
      <section className="timeslot__card-left">
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-select-thingToDo"
              select
              label="Select"
              value={catOfThings}
              onChange={handleCategoryChange}
              helperText="Please select an activity category"
            >
              {activityCategories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {/* <div>
            <TextField
              id="standard-select-thingToDo"
              select
              label="Select"
              value={thingToDo}
              onChange={handleActivityChange}
              helperText="Please select an activity"
            >
              {activityCategories
                .find((category) => category.name === catOfThings)
                .activities.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          </div> */}
        </form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="start-date-picker-inline"
              label="Check in"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-date-picker-inline"
              label="Check in"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {/* <section className="timeslot__validation">ERROR</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        /> */}
      </section>
      <section className="timeslot__card-right">
        <section className="timeslot__actions">
          <div className={classes.root}>
            <IconButton
              aria-label="save"
              confirm="true"
              onClick={() => validate()}
            >
              <SaveIcon />
            </IconButton>
            <IconButton aria-label="close" danger="true" onClick={reset}>
              <CloseIcon />
            </IconButton>
          </div>
        </section>
      </section>
    </main>
  );
}
