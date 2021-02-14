import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Footer(props) {
  return ( 
  <footer>
  <ul>
    <li>
      <Link to="/aboutUs">About Us</Link>
    </li>
    <li>
      <Link to="/blog">Blog</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
  </ul>
  </footer>
  );
}