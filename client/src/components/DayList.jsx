import React from "react";
import { addDays, format } from "date-fns";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import DayListItem from "./DayListItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function DayList(props) {
  console.log("Day L Props", props.activities)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let startAt = props.startDate;
  const daysArray = [];

  while (startAt <= props.endDate) {
    daysArray.push(startAt);
    startAt = addDays(startAt, 1);
  }

  let i = 0;

  function updateActivityTimeslot(activity, timeslot, day){
    
    props.setDayList([...props.dayList, {activity, timeslot, day}])

  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {daysArray.map((day) => {
          return <Tab label={format(day, "iiii, PP")} key={i++} />;
        })}
      </Tabs>

      <div className={classes.tabpanel}>
        <DayListItem activities={props.activities} activityCategories={props.activityCategories} plannedActivities = {props.plannedActivities} saveActivity={props.saveActivity} deleteActivity = {props.deleteActivity} updateActivityTimeslot={props.updateActivityTimeslot} updateActivityTimeslot={updateActivityTimeslot} dayIndex={value} dayList={props.dayList}/>
      </div>
    </div>
  );
}