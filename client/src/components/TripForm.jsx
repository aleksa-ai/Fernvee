import React, { useState } from "react";
import "date-fns";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function TripForm(props) {
  const classes = useStyles();

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [city, setCity] = useState("");
  const [tripName, setTripName] = useState("");

  //setSelectedStartDate("2021-03-21");

  // var sevenDaysAfter = Date.now();
  // sevenDaysAfter.setDate(sevenDaysAfter.getDate() + 4);
  // setSelectedEndDate(selectedStartDate);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    props.onStartDateChanged(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    props.onEndDateChanged(date);
  };

  const handleNameChange = (name) => {
    console.log(name)
    setTripName(name.target.value)
    props.onNameChange(name)
  };

  const handleCityChange = (cityId) => {
    setCity(cityId.target.value)
    props.onCityChange(cityId);
  };



  // console.log("TRIP FORM PROPS ", props);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container justify="center" direction="column" alignItems="center">
        <TextField
          required
          id="standard-required"
          label="Trip Name"
          defaultValue=""
          onChange={handleNameChange}
        />
        <TextField
          id="standard-select-activityCategoryState"
          select
          label="Select"
          value={city}
          onChange={handleCityChange}
          helperText="Please select city"
        >
          {props.cities &&
            props.cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
        </TextField>

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
  );
}
