import { useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Show from "./Show";

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

export default function Trips() {
  const [userTrips, setUserTrips] = useState([]);
  const classes = useStyles();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get(`/api/userItineraries/1`).then(
  //       (result) => result.data,

  //       (error) => {
  //         console.log("ERROR " + error.message);
  //         return [];
  //       }
  //     );
  //     console.log(result);
  //     setUserTrips(result);
  //   };

  //   fetchData();
  // }, []);

  // Called when user deletes a trip from their collection
  const deleteTrip = (trip) => {
    // Filter out the trip that was deleted
    const updatedUserTrips = userTrips.filter( t => t !== trip);

    // Update state for change detection
    setUserTrips( updatedUserTrips );
  }

  let parsedUserTrips = [];

  parsedUserTrips = userTrips.map((trip, index) => {
    return (
      <Grid item xs={6} key={index}>
        <Show key={trip.toString()} trip={trip} onDelete={deleteTrip}/>
      </Grid>
    );
  });

  return (
    <>
    <Typography variant="h4">
     My Trips 
     </Typography>
    <div className={classes.container}>
      <Grid container item xs={12} spacing={6}>
        {parsedUserTrips}
      </Grid>
    </div>
    </>
  );
}
