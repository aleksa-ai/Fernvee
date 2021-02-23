var express = require("express");
var router = express.Router();

module.exports = ({ getSystemActivitiesForItinerary }) => {
  router.get("/:id", (req, res) => {
    const sysItineraryId = req.params.id;
    getSystemActivitiesForItinerary(sysItineraryId)
      .then((trips) => {
        res.json(trips)
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
