import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    //city: 'Paris',
    //itinerary: 'Foodie',
    activities: [],
    activity_categories: [],
  });

  const setActivity = (activity) => setState({ ...state, activity });


  // Load information from database on pageload
  useEffect(() => {
    async function dataFetch() {
      Promise.all([
        // axios.get("/api/cities"),
        // axios.get("/api/itineraries"),
        // axios.get("/api/interviewers"),
        axios.get("/api/activities"),
        axios.get("/api/activityCategories")
      ]).then((all) => {
        setState((prev) => ({
          ...prev,
          //city: all[0].data,
          //itinerary: all[1].data,
          activities: all[0].data,
          activity_categories: all[1].data,
        }));
      })
      .catch((error) => console.log('ERROR', error))
    }
    dataFetch()
  }, []);
  //  On click of the Save button in form
  //  function saveActivity - might need helpers in front-end too

  //  On click of the Confirm button Delete confirmation
  //  ...
  return {state, setActivity}
}