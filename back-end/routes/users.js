var express = require('express');
var router = express.Router();


module.exports = ({
  getUsers, addUser
}) => {
  router.get('/', (req, res) => {
    console.log(getUsers)
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post("/", (req, res) => {
    let firstName = req.firstName
    let lastName = req.lastName
    let email = req.email
    let password = req.password
    let travelStyle = req.travelStyle
    let createdAt = req.createdAt
    console.log(addUser)
    addUser(firstName,
      lastName,
      email,
      password,
      travelStyle,
      createdAt)
    .then((user) => res.json(user))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
  
}