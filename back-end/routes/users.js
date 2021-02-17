var express = require('express');
var router = express.Router();

module.exports = ({
  getUsers
}) => {
  router.get('/', (req, res) => {
    console.log(getUsers)
    getUsers()
        .then((users) => res.json(users))
        .catch((err) => res.json({
            error: err.message
        }));
});

return router;
}