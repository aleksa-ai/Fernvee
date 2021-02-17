var express = require('express');
var router = express.Router();

module.exports = ({
  getCuratedTrips
}) => {
  router.get('/', (req, res) => {
    getCuratedTrips(placeId)
        .then((trips) => res.json(trips))
        .catch((err) => res.json({
            error: err.message
        }));
});

return router;
}