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

  const getCuratedTrips = (placeId) => {
    const query = {
      text: (`
      SELECT * FROM cities 
      JOIN itineraries ON itineraries.city_id = cities.id
      WHERE cities.placeId = $1
    `, [placeId])
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