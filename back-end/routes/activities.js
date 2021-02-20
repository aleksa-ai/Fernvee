var express = require("express");
var router = express.Router();

module.exports = ({ getActivities }) => {
  router.get("/", (req, res) => {
    console.log(getActivities);
    getActivities()
      .then((activities) => res.json(activities))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
