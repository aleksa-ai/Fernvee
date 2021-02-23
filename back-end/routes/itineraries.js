var express = require("express");
var router = express.Router();


module.exports = ({ getUserItineraries, addItinerary, deleteUserTrip }) => {

  router.get("/:id", (req, res) => {
    let userId = req.params.id;

    getUserItineraries(userId)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    let tripName = req.body.name;
    let imageUrl = req.body.imageUrl;
    let tripStart = req.body.startTime;
    let tripEnd = req.body.endTime;
    let cityId = req.body.cityId;
    let userId = req.body.userId

    addItinerary(tripName, imageUrl, tripStart, tripEnd, cityId, userId)
      .then((itinerary) => {
        res.json(itinerary)
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.delete("/:user_trip_id", (req, res) => {
    const userTripId = req.params.user_trip_id;
    deleteUserTrip(userTripId)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
