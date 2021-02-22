var express = require("express");
var router = express.Router();

module.exports = ({ getUsers, addUser }) => {
  router.get("/", (req, res) => {
    console.log(getUsers);
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let travelStyle = req.body.travelStyle;
    let createdAt = req.body.createdAt;
    addUser(firstName, lastName, email, password, travelStyle, createdAt)
      .then((user) => res.json(user))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
