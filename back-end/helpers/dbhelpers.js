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

  const getUserTrips = () => {
    const query = {
      text: (`
      SELECT * FROM users
      JOIN user_trips ON users.id = user_trips.user_id
      JOIN itineraries ON itineraries.id = user_trips.itinerary_id
      `),
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  }

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
      text: "SELECT * FROM activity_categories",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getPlannedActivities = () => {
    //Could add day_id, start_time, end_time, itinerary_id from planned_activities
    //Could add category_id from activities
    const query = {
      text: `SELECT
      planned_activities.id,
      json_build_object('name', activities.name, 'phone', activities.phone, 'website_url', activities.website_url, 'address', activities.address, 'description', activities.description, 'image_url', activities.image_url, 'city_id', activities.city_id) AS planned_activity
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
      text: (`
      SELECT * FROM cities 
      JOIN itineraries ON itineraries.city_id = cities.id
      WHERE cities.placeId = $1
    `)
    };

    const values = [placeId];

    return db
    .query(query, values)
    .then((result) => result.rows)
    .catch((err) => err)
  };

  return {
    getUsers,
    getActivities,
    getActivityCategories,
    getPlannedActivities,
    getCuratedTrips,
    getUserTrips
  };
};
