DROP TABLE IF EXISTS planned_activities CASCADE;

CREATE TABLE planned_activities (
  id SERIAL PRIMARY KEY NOT NULL,
  day int NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
  itinerary_id INTEGER REFERENCES itineraries(id) ON DELETE CASCADE
);
