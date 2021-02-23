var express = require("express");
var router = express.Router();

module.exports = ({ getPlannedActivities, addPlannedActivities }) => {
  router.get("/", (req, res) => {
    console.log(getPlannedActivities);
    getPlannedActivities()
      .then((plannedActivities) =>
        res.json(
          plannedActivities.reduce(
            (previous, current) => ({ ...previous, [current.id]: current }),
            {}
          )
        )
      )
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    //console.log( "IN POST PLANNED", req.body.activities);
    //let allActivities = req.body.;

    addPlannedActivities(req.body.activities)
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
