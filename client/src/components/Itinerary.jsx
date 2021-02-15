import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";

import DayList from "./DayList";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Itinerary(props) {
  const classes = useStyles();
  return (
    <>
      <h1>Create My Trip</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <Input
          placeholder="Enter Trip Name"
          inputProps={{ "aria-label": "description" }}
        />
        <Button variant="contained" color="secondary">
          SAVE
        </Button>
      </form>
      <DayList />
    </>
  );
}
