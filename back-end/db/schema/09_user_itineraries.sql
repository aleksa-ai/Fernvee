DROP TABLE IF EXISTS users_itineraries CASCADE;

CREATE TABLE users_itineraries (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(250) NOT NULL,
  image_url text,
  start_time timestamp,
  end_time timestamp,
  city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  itinerary_type_id INTEGER REFERENCES itinerary_type(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

