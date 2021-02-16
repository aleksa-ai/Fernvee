import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";


const catsOfThings = [
  {
    value: 'EAT',
    label: 'Eat',
  },
  {
    value: 'DRINK',
    label: 'Drink',
  },
  {
    value: 'SHOP',
    label: 'Shop',
  },
  {
    value: 'SIGHTSEE',
    label: 'Sightsee',
  },
];

const thingsToDo = [
  {
    value: 'Rest1',
    label: 'Rest1',
  },
  {
    value: 'Rest2',
    label: 'Rest2',
  },
  {
    value: 'Rest3',
    label: 'Rest3',
  },
  {
    value: 'Rest4',
    label: 'Rest4',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function Form(props) {

  const classes = useStyles();
  const [catOfThings, setCatOfThings] = React.useState('Rest1');
  const [thingToDo, setThingsToDo] = React.useState('EUR');
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-02-15'));

  const handleChange = (categoryEvent, activityEvent) => {
    setCatOfThings(categoryEvent.target.value)
    setThingsToDo(activityEvent.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
            'aria-label': 'change date',
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
            'aria-label': 'change date',
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
      <IconButton aria-label="edit">
        <SaveIcon />
      </IconButton>
      <IconButton aria-label="close">
        <CloseIcon />
      </IconButton>
    </div>
        </section>
      </section>
    </main>
  );
}