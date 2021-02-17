import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CuratedTripItem from "./CuratedTripItem";

const useStyles = makeStyles({
  root: {
    paddingTop: "3%",
    width: "100%",
    alignContent: "center",
  },
  container: {
    margin: "auto",
    position: "relative",
    width: "60%",
  },
});

export default function CuratedTripsList(props) {
  const classes = useStyles();

  const { curatedTrips } = props;
  let { placeId } = useParams();

  let parsedCuratedTrips = [];

  console.log(placeId);
  console.log(curatedTrips);

  parsedCuratedTrips = curatedTrips.map((curatedTrip) => {
    return (
      <Grid item xs={6}>
        <CuratedTripItem
          key={curatedTrip.id}
          name={curatedTrip.name}
          image={curatedTrip.image_url}
        />
      </Grid>
    );
  });

  return (
    <>
    <h1>Curated Trips</h1>
    <div className={classes.container}>
      <Grid container item xs={12} spacing={6} className={classes.root}>
        {parsedCuratedTrips}
      </Grid>
    </div>
    </>
  );
}
