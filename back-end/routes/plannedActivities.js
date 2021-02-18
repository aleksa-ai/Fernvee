var express = require("express");
var router = express.Router();

module.exports = ({ getPlannedActivities }) => {
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

  return router;
};
