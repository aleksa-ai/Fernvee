import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect, useParams } from "react-router-dom";
import {
  addDays,
  differenceInCalendarISOWeekYears,
  format,
  setDay,
} from "date-fns";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import DayList from "./DayList";
import TripForm from "./TripForm";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: "9vh",
      marginBottom: "9vh"
    },
  },
}));

function getSteps() {
  return ["Where are you going?", "What do you want to do?", "Review"];
}

export default function Itinerary(props) {
  const classes = useStyles();
  const cookies = useCookies();

  const history = useHistory();
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [dayList, setDayList] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState("");

  // All the following states are for cases with curated trips
  const [tripName, setTripName] = useState("");
  const [readOnly, setReadyOnly] = useState(false);
  const [tripDuration, setTripDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1584967918940-a7d51b064268?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
  );
  const [systemActivities, setSystemActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState(
    props.activities
  );

  let { id } = useParams();

  console.log("Itinerary props ", props);

  // <See if can sepeate this into another file>
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      const result = await axios.get(`/api/curatedTrips/${id}`).then(
        (result) => {
          return result.data[0];
        },
        (error) => {
          console.log("ERROR " + error.message);
          return [];
        }
      );

      const detailedResult = await axios
        .get(`/api/curatedTripDetails/${id}`)
        .then(
          (result) => {
            return result.data;
          },
          (error) => {
            console.log("ERROR " + error.message);
            return [];
          }
        );
      setReadyOnly(true);
      setTripName(result.name);
      setCity(result.city_id);
      setTripDuration(result.duration);
      setImageUrl(result.image_url);
      setSystemActivities(detailedResult);
    };
    fetchData();
  }, [id, props.activities]);

  const startDateChanged = (date) => {
    setStartDate(date);
  };

  const endDateChanged = (date) => {
    setEndDate(date);
  };

  // The dayList is an object of { day: arrayOfProperties }
  const populatedDayList = function () {
    const tempDayList = {};
    let j = 0;
    let currentDate = startDate;
    while (currentDate <= endDate) {
      // For each day populate the 3 slots
      tempDayList[j] = [];
      tempDayList[j].push({
        activity: findSlotInList(j, "Morning"),
        timeslot: "Morning",
        date: currentDate,
      });
      tempDayList[j].push({
        activity: findSlotInList(j, "Afternoon"),
        timeslot: "Afternoon",
        date: currentDate,
      });
      tempDayList[j].push({
        activity: findSlotInList(j, "Evening"),
        timeslot: "Evening",
        date: currentDate,
      });

      currentDate = addDays(currentDate, 1);
      j++;
    }
    // Set the state to propogate changes
    setDayList(tempDayList);
    console.log("DAYLIST", tempDayList);
  };

  // Find activity based on day of occurence and timeslot
  const findSlotInList = (day, slotTime) => {
    let found = systemActivities.filter(
      (a) => a.day_number === day + 1 && a.timeslot === slotTime
    );
    if (found.length > 0) {
      return found[0].activity_id;
    } else {
      return null;
    }
  };

  // Add newly created trip to my trips
  const addNewTrip = async () => {
    const userId = cookies.id; // COOKIES - CHECK IF WORKS

    const postItinerary = await axios
      .post("/api/userItineraries", {
        name: tripName,
        imageUrl: imageUrl,
        startTime: startDate,
        endTime: endDate,
        cityId: city,
        userId: userId,
      })
      .then(
        (result) => {
          console.log(result.data[0]);
          return result.data[0];
        },
        (error) => {
          console.log("ERROR " + error.message);
        }
      );

    // Create an array of booked dayList slots
    const plannedActivities = [];
    Object.keys(dayList).forEach((keyName, index) => {
      for (let day of dayList[keyName]) {
        if (day.activity) {
          let activityDetail = {
            ...filteredActivities.filter((a) => a.id === day.activity)[0],
          };
          activityDetail["day_number"] = index + 1;
          activityDetail["timeslot"] = day.timeslot;
          activityDetail["date"] = day.date;
          activityDetail["userIteneraryId"] = postItinerary.id;
          plannedActivities.push(activityDetail);
        }
      }
    });

    // console.log( "BEFORE", JSON.stringify(plannedActivities));
    // Post itinerary activities
    await axios
      .post("/api/plannedActivities", {
        activities: plannedActivities,
      })
      .then(
        (result) => {
          console.log(result.data);
          redirect();
        },
        (error) => {
          console.log("ERROR " + error.message);
        }
      );
  };

  // Stepper
  const steps = getSteps();

  // Next step was clicked
  const handleNext = () => {
    //console.log("I AM STEP: ", activeStep)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // If the current step is 0, next step is 1 which
    // where we load our day list
    if (activeStep === 0) {
      const newActivities = props.activities.filter(
        (act) => act.city_id === city
      );
      setFilteredActivities(newActivities);

      populatedDayList();
    }
    // If last step, post to database
    if (activeStep === 2) {
      addNewTrip();
    }
  };

  const redirect = () => {
    const url = `/trips/1`;
    history.push(url);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex, filteredActivities) {
    switch (stepIndex) {
      case 0:
        return (
          <TripForm
            cityId={city}
            tripName={tripName}
            makeReadOnly={readOnly}
            duration={tripDuration}
            onStartDateChanged={startDateChanged}
            onEndDateChanged={endDateChanged}
            onCityChange={setCity}
            onNameChange={setTripName}
            cities={props.cities}
          />
        );
      case 1:
        return (
          <DayList
            name={tripName}
            startDate={startDate}
            endDate={endDate}
            dayList={dayList}
            activities={filteredActivities}
            saveActivity={props.saveActivity}
            activityCategories={props.activityCategories}
            plannedActivities={props.plannedActivities}
            deleteActivity={props.deleteActivity}
            // setDayList={setDayList}
          />
        );
      case 2:
        return (
          <Review
            startDate={startDate}
            endDate={endDate}
            dayList={dayList}
            activities={filteredActivities}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }

  // console.log("ITINERARY PROPS", props)

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {getStepContent(activeStep, filteredActivities)}
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
