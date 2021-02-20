var express = require("express");
var router = express.Router();

module.exports = ({ getUserTrips }) => {
  router.get("/:id", (req, res) => {
    const placeId = req.params.id;
    console.log(getUserTrips);
    getUserTrips()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
