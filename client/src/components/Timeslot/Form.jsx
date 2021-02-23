import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import "./styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Form(props) {
  //console.log("FORM PROPS", props);

  let activityCategories = props.activityCategories;
  let activities = props.activities;

  const classes = useStyles();

  const [activityCategoryState, setActivityCategoryState] = useState(
    activityCategories[0].id
  );

  const [activityBasedOnCategory, setActivityBasedOnCategory] = useState(
    []
  );

  const handleCategoryChange = (categoryEvent) => {
    const newCategory = categoryEvent.target.value;

    const firstActivity = activityCategories.find((category) =>
      category.id === newCategory ? category.id : null
    );

    setActivityCategoryState(newCategory);
    setActivityBasedOnCategory(firstActivity);
  };

  const handleActivityChange = (event) => {
    const newActivity = event.target.value;
    setActivityBasedOnCategory(newActivity);
  };

  const [error, setError] = useState("");

  const reset = () => {
    props.onCancel();
    setActivityCategoryState(activityCategories[0].id);
    setActivityBasedOnCategory(null);
  };

  function validate() {
    if (!activityCategoryState) {
      setError("An activity category must be selected");
      return;
    }
      console.log("ABOC!!!", activityBasedOnCategory)
    if (activityBasedOnCategory.length === 0) {
      setError("An activity must be selected");
      return;
    }
    setError("");
    props.onSave(activityBasedOnCategory);
  }

  return (
    <main className="timeslot timeslot__card--create">
      <section className="timeslot__card-left">
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-select-activityCategoryState"
              select
              label="Select"
              value={activityCategoryState}
              onChange={handleCategoryChange}
              helperText="Please select an activity category"
            >
              {activityCategories &&
                activityCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="standard-select-activityBasedOnCategory"
              select
              label="Select"
              value={activityBasedOnCategory}
              onChange={handleActivityChange}
              helperText="Please select an activity"
            >
              {activities
                .filter(
                  (activity) => activity.category_id === activityCategoryState
                )
                .map((activity) => (
                  <MenuItem key={activity.id} value={activity.id}>
                    {activity.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
        </form>

      </section>

      <section className="timeslot__validation">{error}</section>
      <section className="timeslot__card-right">
        <section className="timeslot__actions">
          <div className={classes.root}>
            <IconButton
              aria-label="save"
              confirm="true"
              onClick={() => validate()}
            >
              <SaveIcon />
            </IconButton>
            <IconButton aria-label="close" danger="true" onClick={reset}>
              <CloseIcon />
            </IconButton>
          </div>
        </section>
      </section>
    </main>
  );
}
