import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(15),
    textAlign: 'center',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid 
      container 
      spacing={4}
      align="center"
      justify="center"
      >
        <Grid item xs={12} >
          <Paper className={classes.paper}>Activity 1</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Activity 2</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Activity 3</Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}
