var express = require("express");
var router = express.Router();

module.exports = ({ getActivityCategories }) => {
  router.get("/", (req, res) => {
    console.log(getActivityCategories);
    getActivityCategories()
      .then((categories) => res.json(categories))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
