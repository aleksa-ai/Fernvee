import React from "react";
import { differenceInCalendarDays, addDays, format } from "date-fns";
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

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

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let daysInTrip = differenceInCalendarDays(
    props.endDate,
    props.startDate
  )

  let startAt = props.startDate;
  const daysArray = [];

  while (startAt <= props.endDate){
    daysArray.push(startAt);
    startAt = addDays(startAt,1)

  };

  console.log(daysArray)




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
        {daysArray.map ((day) => {
         return  <Tab label={format(day, "PPPP")}{...a11yProps(0)} />
       

        })}
        
      </Tabs>
      <div className={classes.tabpanel}>
      
          <DayListItem />
    
      </div>
    </div>
  );
}
