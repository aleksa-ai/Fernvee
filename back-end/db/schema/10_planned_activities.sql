DROP TABLE IF EXISTS planned_activities CASCADE;

CREATE TABLE planned_activities (
  id SERIAL PRIMARY KEY NOT NULL,
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
  user_itinerary_id INTEGER REFERENCES users_itineraries(id) ON DELETE CASCADE,
  day_number INT,
  timeslot varchar(20)
);
