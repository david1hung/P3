/* Populate list of videos */
INSERT INTO Videos (soc, vid) VALUES('25-1011', 0);
INSERT INTO Videos (soc, vid) VALUES('25-2022', 0);
INSERT INTO Videos (soc, vid) VALUES('25-2052', 0);


/* Random Queue */
INSERT INTO VidQueue(id, soc, vid, viewOrder) VALUES(1, '25-1011', 0, 3);
INSERT INTO VidQueue(id, soc, vid, viewOrder) VALUES(1, '25-2022', 0, 2);
INSERT INTO VidQueue(id, soc, vid, viewOrder) VALUES(1, '25-2052', 0, 1);

/* Sample Vid Rating */
INSERT INTO VidRating(id, soc, vid, rating) VALUES(1, '11-1011', 0, 1);
INSERT INTO VidRating(id, soc, vid, rating) VALUES(1, '25-2052', 0, 1);
INSERT INTO VidRating(id, soc, vid, rating) VALUES(1, '25-2052', 1, -1);
