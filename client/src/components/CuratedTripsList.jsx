import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import CuratedTripItem from "./CuratedTripItem";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    paddingBottom: "3rem",
    width: "100%",
    alignContent: "center",
  },
  container: {
    margin: "auto",
    position: "static",
    width: "60%",
    marginTop: "2%"
  },
  cardRoot: {
    minWidth: 400,
    // maxWidth: 350,
    minHeight: 440,
    maxHeight: 470,
    margin: "auto",
  },
  cardMedia: {
    height: 300,
  },
});

export default function CuratedTripsList(props) {
  const classes = useStyles();
  const history = useHistory();

  const search = useLocation().search;
  const placeId = new URLSearchParams(search).get("placeId");

  const [curatedTrips, setCuratedTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/api/curatedTrips?placeId=${placeId}`)
        .then(
          (result) => {
            return result.data;
          },
          (error) => {
            console.log("ERROR " + error.message);
            return [];
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
          key={curatedTrip.id}
          id={curatedTrip.id}
          name={curatedTrip.name}
          duration={curatedTrip.duration}
          image={curatedTrip.image_url}
          systemItineraryId={curatedTrip.id}
        />
      </Grid>
    );
  });

  const createRedirect = () => {
    const url = `/create`;
    history.push(url);
  };

  return (
    <>
      <Typography gutterBottom variant="h4">
        Curated Trips
      </Typography>
      <div className={classes.container}>
        <Grid container item xs={12} spacing={6} className={classes.root}>
          {parsedCuratedTrips}
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1584967918940-a7d51b064268?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Create Trip
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={createRedirect}
                type="submit"
              >
                Create
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </>
  );
}
