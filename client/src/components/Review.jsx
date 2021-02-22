import React, { useState } from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  avatar: {
    width: "150px",
    height: "auto",
    paddingRight: "10px",
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const { dayList, activities } = props;

  console.log(activities);

  let dayListTabs = [];
  let bookedActivities = [];

  // Create an array of booked dayList slots
  Object.keys(dayList).forEach((keyName, index) => {
    for (let day of dayList[keyName]) {
      if (day.activity) {
        let activityDetail = {
          ...activities.filter((a) => a.id === day.activity)[0],
        };
        activityDetail["timeslot"] = day.timeslot;
        activityDetail["date"] = day.date;
        bookedActivities.push(activityDetail);
      }
    }
  });

  let listOfActivities = [];
  listOfActivities = bookedActivities.map((activity, index) => {
    return (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            alt="Remy Sharp"
            src={activity.image_url}
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          primary={activity.name}
          secondary={format(dayList["0"][0].date, "iiii, PP") + ": " + activity.timeslot}
        />
      </ListItem>
    );
  });

  console.log(bookedActivities);

  return (
    <div className={classes.root}>
      {/* <Grid container spacing={10}>
        <Grid item xs={2} md={6} key={index}> */}
          {/* <div className={classes.demo}> */}
            <List dense={dense}>{listOfActivities}</List>
          {/* </div>
        </Grid>
      </Grid> */}
    </div>
  );
}
