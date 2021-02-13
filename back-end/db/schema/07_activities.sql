DROP TABLE IF EXISTS activities CASCADE;

CREATE TABLE activities (
  id SERIAL PRIMARY KEY NOT NULL,
  name text NOT NULL,
  phone varchar(250),
  website_url text,
  address text,
  description text,
  image_url text,
  city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES activity_categories(id) ON DELETE CASCADE
);
