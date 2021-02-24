DROP TABLE IF EXISTS system_activities CASCADE;

CREATE TABLE system_activities (
  id SERIAL PRIMARY KEY NOT NULL,
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
  system_itinerary_id INTEGER REFERENCES system_itineraries(id) ON DELETE CASCADE,
  day_number INT,
  timeslot varchar(20)
);
