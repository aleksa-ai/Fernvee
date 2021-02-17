module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getActivities = () => {
    const query = {
      text: 'SELECT * FROM activities',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getActivityCategories = () => {
    const query = {
      text: 'SELECT * FROM activity_categories',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCuratedTrips = () => {
    const query = {
      text: `
      SELECT * FROM itineraries
      JOIN planned_activities on planned_activities.itinerary_id = itineraries.id
      JOIN activities ON planned_activities.activity_id = activities.id
      JOIN cities ON activities.city_id = cities.id
      `
    };

    return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err)
  };

  return {
    getUsers,
    getActivities,
    getActivityCategories,
    getCuratedTrips
  };
};