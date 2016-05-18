DROP TABLE IF EXISTS Occupation;
DROP TABLE IF EXISTS StateOccupation;
DROP TABLE IF EXISTS RegionalOccupation;
DROP TABLE IF EXISTS OccupationInterests;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS FBUsers;

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

CREATE TABLE Users(firstName VARCHAR(30) NOT NULL,
                    lastName VARCHAR(30) NOT NULL,
                    email VARCHAR(60) NOT NULL,
                    password VARCHAR(30) NOT NULL,
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY);

CREATE TABLE FBUsers(firstName VARCHAR(30) NOT NULL,
                     lastName VARCHAR(30) NOT NULL,
                     email VARCHAR(60) NOT NULL,
                     id BIGINT UNSIGNED NOT NULL PRIMARY KEY);
