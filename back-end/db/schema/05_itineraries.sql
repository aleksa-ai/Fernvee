DROP TABLE IF EXISTS itineraries CASCADE;

CREATE TABLE itineraries (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(250) NOT NULL,
  image_url text NOT NULL,
  itinerary_type_id INTEGER REFERENCES itinerary_type(id) ON DELETE CASCADE
);

