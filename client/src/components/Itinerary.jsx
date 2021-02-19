import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import DayList from "./DayList";
import TripForm from "./TripForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

function getSteps() {
  return ["Where are you going?", "What do you want to do?", "Review"];
}

export default function Itinerary(props) {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  const [dayList, setDayList] = useState([]);

  console.log(dayList)

  const startDateChanged = (date) => {
    setStartDate(date);
  };

  const endDateChanged = (date) => {
    setEndDate(date);
  };

  // Stepper
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex, activities) {
    switch (stepIndex) {
      case 0:
        return (
          <TripForm
            onStartDateChanged={startDateChanged}
            onEndDateChanged={endDateChanged}
          />
        );
      case 1:
        return <DayList startDate={startDate} endDate={endDate} activities={activities} saveActivity={props.saveActivity} activityCategories={props.activityCategories} plannedActivities = {props.plannedActivities} deleteActivity = {props.deleteActivity} dayList={dayList} setDayList={setDayList} />
      case 2:
        return "REVIEW";
      default:
        return "Unknown stepIndex";
    }
  }

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
        {activeStep === steps.length ? (
          <div>
            <Redirect to="/trips" />
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, props.activities)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
