import React, { useState, useEffect } from "react";
import {format } from "date-fns";
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
          <Typography component={'span'} >{children}</Typography>
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
  // console.log("DAY LIST PROPS:", props)
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const dayList = props.dayList;


  // When a specific day is clicked
  const handleChange = (event, newValue) => {
    // console.log("TabChanged", newValue);
    setValue(newValue);
  };

  function updateActivityTimeSlot(slot){
    console.log( dayList );

    // PROBABLY CAN DELETE BUT LEAVE FOR NOW 

    // console.log( "In UpdateActivityTimeSlot: ", slot);
    //Get slot to update
    // activity: null
    // date: Sat Feb 20 2021 22:49:00 GMT-0500 (Eastern Standard Time) {}
    // timeslot: "Morning"


    // let dayKey, idx;
    // for (const [key, value] of Object.entries(props.dayList)) {
    //   value.forEach(function(entry, index) {
    //     if( entry.date === slot.date && entry.timeslot === slot.timeslot){
    //       console.log("Found" +  entry );
    //       dayKey = key;
    //       idx = index;
    //     }
    //   });
    // }

    // console.log( "Key and index ", dayKey, idx)

    // this.setState(prevState => ({
    //   jasper: {                   // object that we want to update
    //       ...prevState.jasper,    // keep all other key-value pairs
    //       name: 'something'       // update the value of specific key
    //   }
    // }))


    // props.setDayList([...props.dayList, slot])

  }

  let dayListTabs = [];
  dayListTabs = Object.keys(dayList).map((keyName, index) => {
    return (
      <TabPanel value={value} index={index} key={index} >
        { <DayListItem
          daySlots={dayList[keyName]}
          activities={props.activities} 
          activityCategories={props.activityCategories} 
          plannedActivities = {props.plannedActivities} 
          saveActivity={props.saveActivity} 
          deleteActivity = {props.deleteActivity} 
          updateActivityTimeSlot={updateActivityTimeSlot} 
          /> }
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
            return <Tab label={format(dayList[keyName][0].date, "iiii, PP")} key={i++} />;
        })}
      </Tabs>
        {dayListTabs}
    </div>
  );
}