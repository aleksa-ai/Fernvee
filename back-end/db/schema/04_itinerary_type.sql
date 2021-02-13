DROP TABLE IF EXISTS itinerary_type CASCADE;
DROP TYPE IF EXISTS it_types;

CREATE TYPE it_types AS ENUM ('Foodie', 'Romantic', 'Historic', 'Glamour', 'Alternative');

CREATE TABLE itinerary_type (
  id SERIAL PRIMARY KEY NOT NULL,
  name it_types NOT NULL
);