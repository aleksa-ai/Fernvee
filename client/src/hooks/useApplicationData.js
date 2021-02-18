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
        axios.get("/api/activities"),
        axios.get("/api/activityCategories"),
        axios.get("/api/plannedActivities"),
      ])
        .then((all) => {
          setState((prev) => ({
            ...prev,
            //cities: all[0].data,
            //itineraries: all[1].data,
            activities: all[0].data,
            activity_categories: all[1].data,
            planned_activities: all[2].data,
          }));
        })
        .catch((error) => console.log("ERROR", error));
    }
    dataFetch();
  }, []);



  //  On click of the Save button in form
  function saveActivity(id, planned_activity) {
    const bookedTimeslot = {
      ...state.planned_activities[id],
      planned_activity: { ...planned_activity },
    };

    const plannedActivities = {
      ...state.planned_activities,
      [id]: bookedTimeslot,
    };

    return axios
      .put(`/api/plannedActivities/${id}`, { planned_activity })
      .then(() => {
        setState((prev) => ({
          ...prev,
          plannedActivities,
        }));
      });
  }

  //  On click of the Confirm button Delete confirmation
  function deleteActivity(id, planned_activity) {
    const bookedTimeslot = {
      ...state.planned_activities[id],
      planned_activity: null,
    };

    const plannedActivities = {
      ...state.planned_activities,
      [id]: bookedTimeslot,
    };

    return axios.delete(`/api/plannedActivities/${id}`).then(() => {
      setState((prev) => ({
        ...prev,
        plannedActivities,
      }));
    });
  }

  return { state, setActivity, saveActivity, deleteActivity };
}
