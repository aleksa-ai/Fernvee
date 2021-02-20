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
  })

  router.post("/", (req, res) => {
    db.query(
      `INSERT INTO users (first_name, last_name, email, password, travel_style, created_at)
       VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text)
       RETURNING id;
    `,
      [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.travel_style, req.body.created_at]
    )
  });

  return router;
  
}