import React, { useState, useEffect } from "react";
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



const thingsToDo = {
  eat: ["Resto1", "Resto2", "Resto3"],
  drink: ["Bar1", "Bar2", "Bar3"],
  shop: ["Shop1", "Shop2"],
};

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
  const [thingToDo, setThingsToDo] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-02-16")
  );

  const handleChange = (categoryEvent) => {
    setCatOfThings(categoryEvent.target.value)
    .then()
    //.setThingsToDo(activityEvent.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [error, setError] = useState("");
  const reset = () => {
    props.onCancel();
    setCatOfThings("Eat");
    thingToDo(null);
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
