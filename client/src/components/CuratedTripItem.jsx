import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "auto",
  },
  media: {
    height: 300,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CuratedTripItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const [tripDetails, setTripDetails] = useState([]);
  const [open, setOpen] = React.useState(false);

  const systemItineraryId = props.systemItineraryId;

  let tripDetailList = [];

  // const redirect = () => {
  //   const url = `/curatedTrips/:placeId/:id`;
  //   history.push(url);
  // };

  // <See if can sepeate this into another file>
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/api/curatedTripDetails/${systemItineraryId}`)
        .then(
          (result) => {
            console.log("test", result);
            return result.data;
          },
          (error) => {
            console.log("ERROR " + error.message);
            return [];
          }
        );

       setTripDetails(result);
    };
    fetchData();
  }, [systemItineraryId]);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };


  // Add trip to my trips
  const addToTrips = () => {
    const userId = "1"; // Will need to change to props.userId when have authentication
    const tripId = props.id;
    console.log("prips.id ", props.id);
    const url = `/trips`;
    history.push(url);

    axios
      .post(`/api/userIt/${userId}/`, null, {
        params: {
          itinerary_id: tripId,
        },
      })
      .then((response) => {
        console.log("in add trips");
        console.log(response);
        // response.status
      });
  };

  tripDetailList = tripDetails.map((item, index) => {
    return (
      <div  key={index}>
        {item.name} <br></br>
        Day {item.day_number} {item.timeslot}<br></br>
        <img src={item.image_url} alt="Girl in a jacket"/> <br></br>
        Description<br></br>
        {item.description}<br></br> <br></br>
      </div>
    );
  });


  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={props.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {props.duration} days
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={openDialog}
            type="submit"
          >
            View Details
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={addToTrips}
            type="submit"
          >
            Add to My Trips
          </Button>
        </CardActions>
      </Card>

      <Dialog 
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle   id="alert-dialog-title" >
          {"Trip Details"}
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
