import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
  avatar: {
    width: "150px",
    height: "auto",
    paddingRight: "10px",
  }
}));

export default function Show(props) {
  let slot = props.slot;

  // Populate activity
  let activity = null;

  let activities = props.activities;
  activity = activities.filter((activity) => activity.id === slot.activity)[0];

  console.log("ACTIVITY", activity)

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={activity.image_url} title="image_url" />
        <CardContent>
          <Typography gutterBottom variant="h2" component="h2">
            {activity.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h5">
            {activity.address}
          </Typography>
          <Typography gutterBottom variant="h5" component="h5">
            {activity.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {activity.description}
          </Typography>
          <Typography gutterBottom variant="p" component="p">
            {<a href={activity.website_url}>{activity.website_url}</a>}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="edit" onClick={props.onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => props.onDelete()}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
