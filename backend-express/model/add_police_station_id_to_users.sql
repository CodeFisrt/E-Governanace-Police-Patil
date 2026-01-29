ALTER TABLE users
ADD COLUMN police_station_id INT;

ALTER TABLE users
ADD CONSTRAINT fk_police_station
FOREIGN KEY (police_station_id)
REFERENCES police_stations(station_id);