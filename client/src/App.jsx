import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import MyTrips from "./components/MyTrips/index";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CuratedTripsList from "./components/CuratedTripsList";
import Itinerary from "./components/Itinerary";
import Nav from "./components/Partials/_Nav";
import Footer from "./components/Partials/_Footer/_index";
import About from "./components/Partials/_Footer/About";
import Blog from "./components/Partials/_Footer/Blog";
import Contact from "./components/Partials/_Footer/Contact";
import Explore from "./components/Explore";



import useApplicationData from "./hooks/useApplicationData";

import {
  //getTimeslotsForDay,
  getActivity,
  //getInterviewersForDay,
} from "../src/helpers/selectors";

//Temmporary paths
import Timeslot from "./components/Timeslot/index";
import Form from "./components/Timeslot/Form";
import Show from "./components/Timeslot/Show";


import "./App.css";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E76F51",
    },
    secondary: {
      main: "#2A9D8F",
    },
    // Not working?
    // tertiary: {
    //   main: "#F4A261",
    // }
  },
});

function App() {
  const { state, setActivity, saveActivity, deleteActivity } = useApplicationData();

  console.log('state', state)

  // const activities = (state.activities).map((activity) => <Show name={activity.name}/>);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact>
              <Explore />
            </Route>
            <Route path="/trips">
              <MyTrips />
            </Route>
            <Route path="/create">
              <Itinerary  
              activityCategories = {state.activity_categories}
              activities = {state.activities}
              plannedActivities = {state.planned_activities}
              saveActivity = {saveActivity}
              cancelActivity = {deleteActivity}
              />
            </Route>
            <Route path="/myProfile">
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <h1>Logout</h1>
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route
              path="/curatedTrips/:placeId"
              children={<CuratedTripsList />}
              exact
            >
              <CuratedTripsList />
            </Route>
            <Route path="/curatedTrips/:placeId/:id">
              <Itinerary />
            </Route>
            <Route path="/aboutUs">
              <About />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            {/* <Route path="/timeslot">
              <Timeslot 
              activityCategories = {state.activity_categories}
              activities = {state.activities}
              plannedActivities = {state.planned_activities}
              saveActivity = {state.saveActivity}
              cancelActivity = {state.cancelActivity}/>
            </Route> */}
            <Route path="/Form">
              <Form />
            </Route>
            <Route path="/Show">
              <Show />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
