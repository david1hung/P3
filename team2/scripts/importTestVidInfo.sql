/* Populate list of videos */
INSERT INTO Videos (soc, vid) VALUES('25-1011', 0);
INSERT INTO Videos (soc, vid) VALUES('25-2022', 0);
INSERT INTO Videos (soc, vid) VALUES('25-2052', 0);


/* Random Queue */
INSERT INTO VidQueue(id, soc, vid, viewOrder) VALUES(1, '25-1011', 0, 3);
INSERT INTO VidQueue(id, soc, vid, viewOrder) VALUES(1, '25-2022', 0, 2);
INSERT INTO VidQueue(id, soc, vid, viewOrder) VALUES(1, '25-2052', 0, 1);

/* Sample ViewHistory */
/* VALUES(UID, SOC, vidNum) 
VidNum corresponds to different people who have the same job/SOC */
INSERT INTO ViewHistory(id, soc, vid) VALUES(1, '11-1011', 0);
INSERT INTO ViewHistory(id, soc, vid) VALUES(1, '25-2052', 0);
INSERT INTO ViewHistory(id, soc, vid) VALUES(1, '25-2052', 1);

/* Sample SOCRatings */
/* VALUES(UID, SOC, rating) */
INSERT INTO SOCRatings(id, soc, rating) VALUES(1,'11-1011', 1);
INSERT INTO SOCRatings(id, soc, rating) VALUES(1,'25-2052', 2); 