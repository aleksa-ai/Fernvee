import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    //city: 'Paris',
    //itinerary: 'Foodie',
    //activity_category: 'Eat',
    activity: 'Jules Vernes'
  });
}

const setActivity = (activity) => setState({ ...state, activity });


  // Load information from database on pageload
  useEffect(() => {
    Promise.all([
      // axios.get("/api/cities"),
      // axios.get("/api/itineraries"),
      // axios.get("/api/interviewers"),
      axios.get("/api/activities"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        //city: all[0].data,
        //itinerary: all[1].data,
        //activity_category:: all[2].data,
        activity: 'a'
      }));
    });
  }, []);

  //  On click of the Save button in form
  //  function saveActivity - might need helpers in front-end too

  //  On click of the Confirm button Delete confirmation
  //  ...
