DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS t_styles;

CREATE TYPE t_styles AS ENUM ('Foodie', 'Romantic', 'Historic', 'Glamour', 'Alternative');

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name varchar(250) NOT NULL,
  last_name varchar(250) NOT NULL,
  email varchar(250) NOT NULL,
  password varchar(250) NOT NULL,
  travel_style t_styles NOT NULL,
  created_at timestamp
);