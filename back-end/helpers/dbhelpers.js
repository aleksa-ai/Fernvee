module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCities = () => {
    const query = {
      text: "SELECT * FROM cities",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };
  
  const addUser = (
    firstName,
    lastName,
    email,
    password,
    travelStyle,
    createdAt
  ) => {
    const query = {
      text: `INSERT INTO users(first_name, last_name, email, password, travel_style, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
   `,
    };

    const values = [
      firstName,
      lastName,
      email,
      password,
      travelStyle,
      createdAt,
    ];

    console.log(values)

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserTrips = (userId) => {
    const query = {
      text: `
      SELECT users.id AS user_id, users.first_name, users.last_name, user_trips.id AS user_trip_id, itineraries.id AS itinerary_id, itineraries.name, itineraries.image_url, itineraries.city_id, itineraries.itinerary_type_id FROM users
      JOIN user_trips ON users.id = user_trips.user_id
      JOIN user_itineraries ON user_itineraries.id = user_trips.itinerary_id
      WHERE users.id = $1
      `,
    };

    const values = [userId];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // const addUserTrip = (userId, itineraryId) => {
  //   const query = {
  //     text: `
  //     INSERT INTO user_trips(user_id, itinerary_id)
  //     VALUES ($1, $2)
  //     RETURNING *
  //     `,
  //   };

  //   const values = [userId, itineraryId];

  //   return db
  //     .query(query, values)
  //     .then((result) => result.rows)
  //     .catch((err) => err);
  // };

  const deleteUserTrip = (id) => {
    const query = {
      text: `
      DELETE FROM user_trips
      WHERE id = $1
      RETURNING *
      `,
    };

    const values = [id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserItineraries = () => {
    const query = {
      text: "SELECT * FROM user_itineraries",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };
  
  const addItinerary = (tripName, imageUrl, tripStart, tripEnd, cityId, userId) => {
    const query = {
      text: `
      INSERT INTO users_itineraries(name, image_url, start_time, end_time, city_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
    };

    const values = [tripName, imageUrl, tripStart, tripEnd, cityId, userId];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getActivities = () => {
    const query = {
      text: "SELECT * FROM activities",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getActivityCategories = () => {
    const query = {
      text: `SELECT *
      FROM activity_categories`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };


  const getSystemActivitiesForItinerary = (systemItineraryId) => {
    //Could add day_id, start_time, end_time, itinerary_id from planned_activities

    // id SERIAL PRIMARY KEY NOT NULL,
    // activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    // system_itinerary_id INTEGER REFERENCES system_itineraries(id) ON DELETE CASCADE,
    // day_number INT,
    // timeslot varchar(20)
    const query = {
      text: `SELECT
        system_activities.id, 
        system_activities.day_number, 
        system_activities.timeslot,
        activities.name,
        activities.description,
        activities.image_url,
        system_activities.system_itinerary_id
      FROM system_activities
      JOIN activities ON  activities.id = system_activities.activity_id
      WHERE system_activities.system_itinerary_id = $1
      `,
    };

    const values = [systemItineraryId];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };


  const getPlannedActivities = () => {
    //Could add day_id, start_time, end_time, itinerary_id from planned_activities

    const query = {
      text: `SELECT
      planned_activities.id,
      json_build_object('name', activities.name, 'phone', activities.phone, 'website_url', activities.website_url, 'address', activities.address, 'description', activities.description, 'image_url', activities.image_url, 'city_id', activities.city_id, 'category_id', activities.category_id) AS planned_activity
      FROM planned_activities
      JOIN activities ON  activities.id = planned_activities.activity_id
      GROUP BY planned_activities.id, activities.id, activities.name
      ORDER BY planned_activities.id
      `,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCuratedTrips = (placeId) => {
    const query = {
      text: `
      SELECT * FROM cities 
      JOIN system_itineraries ON system_itineraries.city_id = cities.id
      WHERE cities.placeId = $1
    `,
    };

    const values = [placeId];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    addUser,
    getActivities,
    getActivityCategories,
    getPlannedActivities,
    getCuratedTrips,
    getUserTrips,
    deleteUserTrip,
    getCities,
    getUserItineraries,
    addItinerary,
    getSystemActivitiesForItinerary
  };
};
