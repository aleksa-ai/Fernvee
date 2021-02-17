import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";



export default function CuratedTripsList(props) {
  let { placeId } = useParams();
  console.log(placeId);
  return (
    <div>
      <h1>Curated trips</h1>
      <h3>ID: {placeId}</h3>
    </div>
  );
}
