import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    maxWidth: "flex",
  },
}));

export default function Show(props) {
  console.log("SHOW PROPS:", props);

  let dayList = props.dayList;
  let firstPlannedActivity = dayList["0"];

  let activities = props.activities;
  let activity = activities.filter(
    (activity) => activity.id === firstPlannedActivity.activity
  )["0"];

  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {activity.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <h5 className="text--light">{firstPlannedActivity.timeslot}</h5>
              <h5 className="text--light">{activity.address}</h5>
              <h5 className="text--regular">{activity.phone}</h5>
              <h5 className="text--light">
                <a href={activity.website_url}>{activity.website_url}</a>
              </h5>
              <h6 className="text--light">{activity.description}</h6>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className={classes.root}>
            <IconButton aria-label="edit" onClick={props.onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => props.onDelete()}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardActions>
    </Card>
  );
}
