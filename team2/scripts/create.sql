DROP TABLE IF EXISTS Occupation;
DROP TABLE IF EXISTS StateOccupation;
DROP TABLE IF EXISTS RegionalOccupation;
DROP TABLE IF EXISTS OccupationInterests;
DROP TABLE IF EXISTS Skills;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserPasswords;
DROP TABLE IF EXISTS FBUsers;
DROP TABLE IF EXISTS LIUsers;
DROP TABLE IF EXISTS Videos;
DROP TABLE IF EXISTS ViewHistory;
DROP TABLE IF EXISTS SOCRatings;
DROP TABLE IF EXISTS VidQueue;

/* Note: currentEmployment, futureEmployment, and jobOpenings are in thousands
   low wages represent the 10th percentile, high wages represent the 90th percentile */
CREATE TABLE Occupation(soc CHAR(7),
                        title VARCHAR(255),
                        wageType ENUM('hourly', 'annual'),
                        averageWage INT UNSIGNED,
                        averageWageOutOfRange BOOLEAN,
                        lowWage INT UNSIGNED,
                        lowWageOutOfRange BOOLEAN,
                        medianWage INT UNSIGNED,
                        medianWageOutOfRange BOOLEAN,
                        highWage INT UNSIGNED,
                        highWageOutOfRange BOOLEAN,
                        educationRequired ENUM('none', 'high school', 'some college', 'postsecondary nondegree', 'associate', 'bachelor', 'master', 'doctoral or professional'),
                        currentEmployment DECIMAL(7, 1) UNSIGNED,
                        futureEmployment DECIMAL(7, 1) UNSIGNED,
                        careerGrowth DECIMAL(3, 1),
                        jobOpenings DECIMAL(7, 1) UNSIGNED,
                        PRIMARY KEY (soc));

/* Note: currentEmployment, futureEmployment, and jobOpenings are in thousands
   low wages represent the 10th percentile, high wages represent the 90th percentile */
CREATE TABLE StateOccupation(soc CHAR(7),
                             stateCode CHAR(2),
                             averageWage INT UNSIGNED,
                             averageWageOutOfRange BOOLEAN,
                             lowWage INT UNSIGNED,
                             lowWageOutOfRange BOOLEAN,
                             medianWage INT UNSIGNED,
                             medianWageOutOfRange BOOLEAN,
                             highWage INT UNSIGNED,
                             highWageOutOfRange BOOLEAN,
                             PRIMARY KEY (soc, stateCode));

/* Deprecated 
CREATE TABLE RegionalOccupation(soc CHAR(7),
                                zipCode CHAR(5),
                                lowAnnualWage INT UNSIGNED,
                                lowAnnualWageOutOfRange BOOLEAN,
                                medianAnnualWage INT UNSIGNED,
                                medianAnnualWageOutOfRange BOOLEAN,
                                highAnnualWage INT UNSIGNED,
                                highAnnualWageOutOfRange BOOLEAN,
                                PRIMARY KEY(soc, zipCode));
*/

CREATE TABLE OccupationInterests(soc CHAR(7),
                                 realistic FLOAT,
                                 investigative FLOAT,
                                 artistic FLOAT,
                                 social FLOAT,
                                 enterprising FLOAT,
                                 conventional FLOAT,
                                 PRIMARY KEY (soc));

/* Each of the "percent" fields is represented as the decimal representation
   of the percentage, i.e. 90% is represented as 0.90
   skillsText is a text field containing a JSON object. It contains the following
   fields, one for each of the 9 intelligences:
        naturalistSkills
        musicalSkills
        logicalSkills
        existentialSkills
        interpersonalSkills
        bodySkills
        linguisticSkills
        intrapersonalSkills
        spatialSkills
   Each of these fields is optional; if missing, it means that there are no
   skills for that intelligence. If present, the field is an array, with each
   element of the array containing a string with the description of the skill. */
CREATE TABLE Skills(soc CHAR(7),
                    naturalistPercent DECIMAL(3,2),
                    musicalPercent DECIMAL(3,2),
                    logicalPercent DECIMAL(3,2),
                    existentialPercent DECIMAL(3,2),
                    interpersonalPercent DECIMAL(3,2),
                    bodyPercent DECIMAL(3,2),
                    linguisticPercent DECIMAL(3,2),
                    intrapersonalPercent DECIMAL(3,2),
                    spatialPercent DECIMAL(3,2),
                    skillsText MEDIUMTEXT,
                    PRIMARY KEY (soc));

CREATE TABLE Users(firstName VARCHAR(30) NOT NULL,
                    lastName VARCHAR(30) NOT NULL,
                    email VARCHAR(60) NOT NULL,
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY);

/* hash and salt are both strings encoding a hexadecimal number */
CREATE TABLE UserPasswords(hash CHAR(64) NOT NULL,
                           salt CHAR(32) NOT NULL,
                           id INT UNSIGNED NOT NULL PRIMARY KEY);

CREATE TABLE FBUsers(fbId BIGINT UNSIGNED NOT NULL PRIMARY KEY,
                     userId INT UNSIGNED NOT NULL);

CREATE TABLE LIUsers(liId VARCHAR(20) NOT NULL PRIMARY KEY,
                     userId INT UNSIGNED NOT NULL);

/* Video History and Ratings, and view Queue */
/* Videos should have more info, like where the video file is saved, or some base info */
CREATE TABLE Videos(soc CHAR(7),
                    vid INT UNSIGNED,
                    PRIMARY KEY (soc,vid));

CREATE TABLE ViewHistory(id INT UNSIGNED NOT NULL,
                    soc CHAR(7),
                    vid INT UNSIGNED,
                    PRIMARY KEY (id, soc, vid));

CREATE TABLE SOCRatings(id INT UNSIGNED NOT NULL,
                    soc CHAR(7),
                    rating INT,
                    PRIMARY KEY (id, soc));

CREATE TABLE VidQueue(id INT UNSIGNED NOT NULL,
                    soc CHAR(7),
                    vid INT UNSIGNED,
                    viewOrder INT UNSIGNED,
                    PRIMARY KEY (id, soc, vid, viewOrder));
