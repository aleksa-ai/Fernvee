import React, { useState } from "react";
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

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={12}>
          <Grid item xs={2} md={6}>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      alt="Remy Sharp"
                      src="https://www.jetsetter.com/wp-content/uploads/sites/7/2018/04/ccvl7VbN-1380x1035.jpeg"
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Activity Name"
                    secondary="Day, Timeslot"
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
