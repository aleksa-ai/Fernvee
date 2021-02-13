DROP TABLE IF EXISTS activity_categories CASCADE;
DROP TYPE IF EXISTS act_cat_names;


CREATE TYPE act_cat_names AS ENUM ('Eat', 'Drink', 'Shop', 'Sightsee');

CREATE TABLE activity_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name act_cat_names NOT NULL
);