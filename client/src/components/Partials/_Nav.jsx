import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Nav(props) {
  return ( 
  <nav>
  <ul>
    <li>
      {/*This is our Home page! */}
      <NavLink to="/">Explore</NavLink>
    </li>
    <li>
      <NavLink to="/trips">My Trips</NavLink>
    </li>
    <li>
      <NavLink to="/create">Create</NavLink>
    </li>
    <li>
      <NavLink to="/myprofile">My Profile</NavLink>
    </li>
    <li>
      <NavLink to="/login">Login</NavLink>
    </li>
    <li>
      <NavLink to="/logout">Logout</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
  </nav>
  );
}
