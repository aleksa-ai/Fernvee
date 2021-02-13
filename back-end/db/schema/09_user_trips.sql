DROP TABLE IF EXISTS user_trips CASCADE;

CREATE TABLE user_trips (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  itinerary_id INTEGER REFERENCES itineraries(id) ON DELETE CASCADE
);

