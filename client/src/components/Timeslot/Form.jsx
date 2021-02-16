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

const catsOfThings = [
  {
    value: "Eat",
    label: "Eat",
  },
  {
    value: "Drink",
    label: "Drink",
  },
  {
    value: "Shop",
    label: "Shop",
  },
  {
    value: "Sightsee",
    label: "Sightsee",
  },
];

const thingsToDo = [
  {
    eat: {
      value: "Rest1",
      label: "Rest1",
    },
  },
  {
    drink: {
      value: "Bar1",
      label: "Bar1",
    },
  },
  {
    shop: {
      value: "Shop1",
      label: "Shop1",
    },
  },
  {
    sightsee: {
      value: "Museum1",
      label: "Museum1",
    },
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const [catOfThings, setCatOfThings] = React.useState("Eat");
  const [thingToDo, setThingsToDo] = React.useState("Rest1");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-02-16")
  );


  const handleChange = (categoryEvent, activityEvent) => {
    setCatOfThings(categoryEvent.target.value);
    setThingsToDo(activityEvent.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [error, setError] = useState("");
  const reset = () => {
    props.onCancel();
    setCatOfThings("Eat");
    thingToDo("Rest1");
  };

  function validate() {
    //!!! UPDATE catsOfThings !!!
    if (catsOfThings === "") {
      setError("catsOfThings cannot be blank");
      return;
    }

    //!!! UPDATE thingsToDo !!!
    if (thingsToDo === null) {
      setError("thingsToDo must be selected");
      return;
    }

    setError("");
    props.onSave(catsOfThings, thingsToDo);
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
              onChange={handleChange}
              helperText="Please select your catOfThings"
            >
              {catsOfThings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="standard-select-thingToDo"
              select
              label="Select"
              value={thingToDo}
              onChange={handleChange}
              helperText="Please select your thingToDo"
            >
              {thingsToDo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
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
          {/* <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick>
            Save
          </Button> */}
          <div className={classes.root}>
            <IconButton aria-label="save" danger onClick={reset}>
              <SaveIcon />
            </IconButton>
            <IconButton aria-label="close" confirm onClick={() => validate()}>
              <CloseIcon />
            </IconButton>
          </div>
        </section>
      </section>
    </main>
  );
}
