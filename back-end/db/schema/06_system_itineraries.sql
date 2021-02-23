DROP TABLE IF EXISTS system_itineraries CASCADE;

CREATE TABLE system_itineraries (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(250) NOT NULL,
  image_url text,
  duration int,
  city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  itinerary_type_id INTEGER REFERENCES itinerary_type(id) ON DELETE CASCADE
);

