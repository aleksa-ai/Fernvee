var express = require('express');
var router = express.Router();


module.exports = ({
  getCities
}) => {
  router.get('/', (req, res) => {
    getCities()
      .then((cities) => res.json(cities))
      .catch((err) => res.json({
        error: err.message
      }));
  })
  return router;
}