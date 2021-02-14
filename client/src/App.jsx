import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MyTrips from './components/MyTrips/index'
import MyProfile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import CuratedTripsList from './components/CuratedTripsList'
import Itinerary from './components/Itinerary'
import Nav from './components/Partials/_Nav'
import Footer from './components/Partials/_Footer/_index'
import About from './components/Partials/_Footer/About'
import Blog from './components/Partials/_Footer/Blog'
import Contact from './components/Partials/_Footer/Contact'

import './App.css';

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <h1>Home Page</h1>
          </Route>
          <Route path="/trips">
            <MyTrips />
          </Route>
          <Route path="/create">
            <Itinerary />
          </Route>
          <Route path="/myProfile">
            <MyProfile />
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
          <Route path="/curatedTrips">
            <CuratedTripsList />
          </Route>
          <Route path="/curatedTrips/:id">
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
        </Switch>
        <Footer />
      </div>      
    </Router>
  );
}

export default App;
