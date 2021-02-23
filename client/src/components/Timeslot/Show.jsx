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
  avatar: {
    width: "150px",
    height: "auto",
    paddingRight: "10px",
  },
}));

export default function Show(props) {
  let slot = props.slot;

  // Populate activity
  let activity = null;

  let activities = props.activities;
  activity = activities.filter((activity) => activity.id === slot.activity)[0];

  const classes = useStyles();
  return (
    <Card className={classes.root}>
       <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
      <CardContent>
        <h2 className="text--light">{activity.name}</h2>
        <h5 className="text--light">{activity.address}</h5>
        <h5 className="text--regular">{activity.phone}</h5>
        <h5 className="text--light">
          <a href={activity.website_url}>{activity.website_url}</a>
        </h5>
        <p className="text--light">{activity.description}</p>
      </CardContent>

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
