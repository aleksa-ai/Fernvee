import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    //city: 'Paris',
    //itinerary: 'Foodie',
    //activity_category: 'Eat',
    curatedTrips: [],
    activities: []
  });

const setActivity = (activity) => setState({ ...state, activity });


  // Load information from database on pageload
  useEffect(() => {
    Promise.all([
      // axios.get("/api/cities"),
      // axios.get("/api/itineraries"),
      // axios.get("/api/interviewers"),
     // axios.get("/api/curatedTrips/"),
      axios.get("/api/activities"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        //city: all[0].data,
        //itinerary: all[1].data,
        //activity_category:: all[2].data,
       // curatedTrips: all[0].data,
        activities: all[0].data
      }));
    });
  }, []);

  // Delete an appointment
  function showCuratedTrips(id) {
    console.log("In Show Curated")
 
    // return axios.get(`/api/curatedTrips/${id}`)
    //   .then((curatedTrips) => {
    //     console.log( curatedTrips );
    //     setState((prev) => ({
    //       ...prev,
    //      curatedTrips,
    //     }));
    //   })
  }
  //  On click of the Save button in form
  //  function saveActivity - might need helpers in front-end too

  //  On click of the Confirm button Delete confirmation
  //  ...
  return {state, setActivity, showCuratedTrips}
}