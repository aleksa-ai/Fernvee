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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "auto",
  },
  media: {
    height: 300,
  },
  avatar: {
    width: "100%",
    height: "auto",
  },
});

export default function Show(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { trip } = props;

  console.log("MyTrips PROPS", props)

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };


  // Delete a trip from My Trips
  const deleteTrip = () => {
    const userTripId = trip.id;
    axios.delete(`/api/userItineraries/${userTripId}`).then((response) => {
      // Delete request succeded, notify parent
      props.onDelete(trip);
    });
  };


  let tripDetailList = [];
  tripDetailList = props.trip.activities.map((item, index) => {
    // Get activity detail
    const activityDetail = props.activities.filter( (act) => act.id === item.activity_id)[0];
    return (
      <div  key={index}>
        <br></br>
         <Typography  color="primary" variant="h5" component="h2" gutterBottom>
        {activityDetail.name} <br></br>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Day {item.day} {item.timeslot}<br></br>
        </Typography>
        <Avatar  variant="rounded" className={classes.avatar} alt="activity_image" src={activityDetail.image_url} />
        <br></br>
        <Typography  color="secondary"  variant="h6" gutterBottom>
        Description<br></br>
        </Typography>
        {activityDetail.description}<br></br> <br></br>
  
        <Divider variant="fullwidth" />
      </div>
     
    );
  });

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={trip.image_url} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="span">
              {trip.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={openDialog} type="button">
            View Details
          </Button>
          <Button
            size="small"
            color="primary"
            type="submit"
            onClick={deleteTrip}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="heading" display="block">
            Trip Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {tripDetailList}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
