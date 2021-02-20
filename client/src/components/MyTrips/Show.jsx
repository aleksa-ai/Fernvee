import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "auto",
  },
  media: {
    height: 300,
  },
});

export default function Show(props) {
  const classes = useStyles();
  const { trip } = props;

  // Delete a trip from My Trips
  const deleteTrip = () => {
    const userTripId = trip.user_trip_id;

    axios.delete(`/api/userTrips/${userTripId}/`).then((response) => {
      // Delete request succeded, notify parent
      props.onDelete(trip);
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={trip.image_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {trip.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" type="submit">
          View Details
        </Button>
        <Button size="small" color="primary" type="submit">
          Edit
        </Button>
        <Button size="small" color="primary" type="submit" onClick={deleteTrip}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
