/* Populate list of videos */
INSERT INTO Videos (soc, personNum) VALUES('25-1011', 0);
INSERT INTO Videos (soc, personNum) VALUES('25-2022', 0);
INSERT INTO Videos (soc, personNum) VALUES('25-2052', 0);

/* Sample ViewHistory */
/* VALUES(UID, SOC, personNum)  
personNum corresponds to different people who have the same job/SOC */
INSERT INTO ViewHistory(id, soc, personNum) VALUES(1, '11-1011', 0);
INSERT INTO ViewHistory(id, soc, personNum) VALUES(1, '25-2052', 0);
INSERT INTO ViewHistory(id, soc, personNum) VALUES(1, '25-2052', 1);

/* Sample SOCRatings */
/* VALUES(UID, SOC, rating) */
INSERT INTO SOCRatings(id, soc, rating) VALUES(1,'11-1011', 1);
INSERT INTO SOCRatings(id, soc, rating) VALUES(1,'25-2052', 2); 