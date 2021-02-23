var express = require("express");
var router = express.Router();

module.exports = ({getCuratedTripById, getCuratedTrips }) => {
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    getCuratedTripById(id)
      .then((trips) => res.json(trips))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });
  
  router.get("/", (req, res) => {
    getCuratedTrips(req.query.placeId)
      .then((trips) => res.json(trips))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
