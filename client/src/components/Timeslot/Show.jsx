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
    maxHeight: "98%",
    maxWidth: "98%",
  },
  media: {
    height: 140,
  },
  buttons: {
    justifyContent: "flex-end",
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

  console.log("ACTIVITY", activity);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={activity.image_url}
          title="image_url"
        />
<<<<<<< HEAD
      <CardContent>
        <h2 className="text--light">{activity.name}</h2>
        <h5 className="text--light">{activity.address}</h5>
        <h5 className="text--regular">{activity.phone}</h5>
        <h5 className="text--light">
          <a href={activity.website_url}>{activity.website_url}</a>
        </h5>
        <p className="text--light">{activity.description}</p>
      </CardContent>
=======
        <CardContent>
          <Typography gutterBottom variant="h2" component="h2">
            {activity.name}
          </Typography>
          
          <Typography variant="h6" component="h5">
            {activity.address}
          </Typography>

          <Typography variant="h6" component="h5">
            {activity.phone}
          </Typography>
>>>>>>> master

          <Typography variant="body2" color="textSecondary" component="p">
            {activity.description}
          </Typography>
          <Typography gutterBottom variant="p" component="p">
            {<a href={activity.website_url}>{activity.website_url}</a>}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttons}>
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
