import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import CuratedTripItem from "./CuratedTripItem";
import { useEffect, useState } from "react";

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
  let { placeId } = useParams();
  const [curatedTrips, setCuratedTrips] = useState([]);

  // <See if can sepeate this into another file>
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/curatedTrips/${placeId}`).then(
        (result) => result.data,
        (error) => {
          console.log("ERROR " + error.message);
          return[]
        }
      );

      setCuratedTrips(result);
    };
    fetchData();
  }, [placeId]);

  let parsedCuratedTrips = [];
  parsedCuratedTrips = curatedTrips.map((curatedTrip, index) => {
    return (
      <Grid item xs={6} key={index}>
        <CuratedTripItem
          key={curatedTrip.toString()}
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
