var express = require("express");
var router = express.Router();


module.exports = ({ getUserItineraries, addItinerary }) => {

  router.get("/", (req, res) => {

    getUserItineraries()
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

  return router;
};
