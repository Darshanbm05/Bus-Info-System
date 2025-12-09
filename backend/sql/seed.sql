USE businfo;

-- admin
INSERT IGNORE INTO admin (username, password) VALUES ('admin', 'admin123');

-- places
INSERT IGNORE INTO places (id, name) VALUES
(1, 'Bengaluru'),
(2, 'Mysuru'),
(3, 'Tumakuru'),
(4, 'Hassan');

-- buses
INSERT IGNORE INTO buses (from_place_id, to_place_id, class_of_service, via_places, departure_time) VALUES
(1,2,'AC','Tumakuru', '06:30:00'),
(2,1,'Non-AC','---','09:00:00'),
(1,3,'AC','Hassan','13:45:00'),
(3,4,'Non-AC','Mysuru','18:10:00');
