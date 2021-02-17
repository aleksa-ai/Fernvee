import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import scriptLoader from "react-async-script-loader";

import axios from "axios";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
   
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


function Explore({ isScriptLoaded, isScriptLoadSucceed }) {
  const classes = useStyles();
  const history = useHistory();

  const [city, setCity] = useState("");
  const [placeId, setPlaceId] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    // Based on selected suggesion save the placeID
    const placeId = results[0].place_id;
    setPlaceId(placeId);
    setCity(value);
  };

  const redirect = () => {
    const url = "/curatedTrips/" + placeId;
    history.push(url);
  };

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div>
        <PlacesAutocomplete
          value={city}
          onChange={setCity}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  {...getInputProps({ placeholder: "Explore Destinations" })}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={redirect}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <br></br>
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#2A9D8F" : "#fff",
                  };

                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={index}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`,
])(Explore);
