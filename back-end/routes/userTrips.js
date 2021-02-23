// var express = require("express");
// var router = express.Router();

// module.exports = ({ getUserTrips, deleteUserTrip }) => {
//   router.get("/:id", (req, res) => {
//     userId = req.params.id;
//     console.log(getUserTrips);
//     getUserTrips(userId)
//       .then((users) => res.json(users))
//       .catch((err) =>
//         res.json({
//           error: err.message,
//         })
//       );
//   }),
//     // router.post("/:id", (req, res) => {
//     //   const userId = req.params.id;
//     //   const tripId = req.query.itinerary_id;
//     //   addUserTrip(userId, tripId)
//     //     .then((users) => res.json(users))
//     //     .catch((err) =>
//     //       res.json({
//     //         error: err.message,
//     //       })
//     //     );
//     // }),
//     router.delete("/:user_trip_id", (req, res) => {
//       const userTripId = req.params.user_trip_id;
//       deleteUserTrip(userTripId)
//         .then((users) => res.json(users))
//         .catch((err) =>
//           res.json({
//             error: err.message,
//           })
//         );
//     });
//   return router;
// };
