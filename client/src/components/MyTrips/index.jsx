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
    marginTop: "2%"
  },
});

export default function Trips(props) {
  const [userTrips, setUserTrips] = useState([]);
  const classes = useStyles();
  let userId = 1;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/userItineraries/${userId}`).then(
        (result) => result.data,
        (error) => {
          console.log("ERROR " + error.message);
          return [];
        }
      );

      setUserTrips(result);
    };

    fetchData();
  }, [userId]);

  // Called when user deletes a trip from their collection
  const deleteTrip = (trip) => {
    // Filter out the trip that was deleted
    const updatedUserTrips = userTrips.filter((t) => t !== trip);

    // Update state for change detection
    setUserTrips(updatedUserTrips);
  };

  let parsedUserTrips = [];

  if (props.activities.length > 0) {
    parsedUserTrips = userTrips.map((trip, index) => {
      return (
        <Grid item xs={6} key={index}>
          <Show
            activities={props.activities}
            key={trip.toString()}
            trip={trip}
            onDelete={deleteTrip}
          />
        </Grid>
      );
    });
  }

  return (
    <>
      <Typography variant="h4">My Trips</Typography>
      <div className={classes.container}>
        <Grid container item xs={12} spacing={6}>
          {parsedUserTrips}
        </Grid>
      </div>
    </>
  );
}
