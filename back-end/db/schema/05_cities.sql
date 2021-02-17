DROP TABLE IF EXISTS cities CASCADE;

CREATE TABLE cities (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(250),
  placeId text,
  country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE
);

