import React from "react";
import { useHistory } from "react-router-dom";
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

export default function Signup(props) {
  const classes = useStyles();
  const history = useHistory();


  const redirect = () => {
    const url = `/curatedTrips/:placeId/:id`;
    history.push(url);
  };

  const addToTrips = () => {
    const url = `/trips`;
    history.push(url);
  }

  return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image={props.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={redirect} type="submit">
              View Details
            </Button>
            <Button size="small" color="primary" onClick={addToTrips} type="submit">
              Add to My Trips
            </Button>
          </CardActions>
        </Card>

  );
}
