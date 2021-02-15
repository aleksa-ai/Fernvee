import "date-fns";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
}));

export default function TripForm() {
  const classes = useStyles();

  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing
        >
          <TextField
            required
            id="standard-required"
            label="Trip Name"
            defaultValue=""
          />
          <TextField
            required
            id="standard-required"
            label="City"
            defaultValue=""
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              placeholder="MM/DD/YYYY"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
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
              placeholder="MM/DD/YYYY"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </form>
    </>
  );
}
