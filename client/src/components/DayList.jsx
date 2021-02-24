import React, { useState, useEffect } from "react";
import { format } from "date-fns";
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
          <Typography component={"span"}>{children}</Typography>
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
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  tabs: {
    flex: "10%",
  },
  tabpanel: {
    flex: "80%",
    textAlign: "left"
  },
  div: {
    padding: "0",
    margin: "0",
  },
}));

export default function DayList(props) {
  //  console.log("DAY LIST PROPS:", props)
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const dayList = props.dayList;

  // When a specific day is clicked
  const handleChange = (event, newValue) => {
    // console.log("TabChanged", newValue);
    setValue(newValue);
  };

  function updateActivityTimeSlot(slot) {}

  let dayListTabs = [];
  dayListTabs = Object.keys(dayList).map((keyName, index) => {
    return (
      <TabPanel value={value} index={index} key={index} className={classes.div}>
        {
          <DayListItem
            daySlots={dayList[keyName]}
            activities={props.activities}
            activityCategories={props.activityCategories}
            plannedActivities={props.plannedActivities}
            saveActivity={props.saveActivity}
            deleteActivity={props.deleteActivity}
            updateActivityTimeSlot={updateActivityTimeSlot}
          />
        }
      </TabPanel>
    );
  });

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {Object.keys(dayList).map((keyName, i) => {
          return (
            <Tab
              label={format(dayList[keyName][0].date, "iiii, PP")}
              key={i++}
            />
          );
        })}
      </Tabs>
      <div className={classes.tabpanel}>{dayListTabs}</div>
    </div>
  );
}
