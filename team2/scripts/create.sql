DROP TABLE IF EXISTS Occupation;
DROP TABLE IF EXISTS RegionalOccupation;

/* Note: currentEmployment, futureEmployment, and jobOpenings are in thousands */
CREATE TABLE Occupation(soc CHAR(7),
                        title VARCHAR(255),
                        currentEmployment DECIMAL(7, 1) UNSIGNED,
                        futureEmployment DECIMAL(7, 1) UNSIGNED,
                        jobOpenings DECIMAL(7, 1) UNSIGNED,
                        medianAnnualWage INT UNSIGNED,
                        medianAnnualWageOutOfRange BOOLEAN,
                        educationRequired ENUM('none', 'high school', 'some college', 'postsecondary nondegree', 'associate', 'bachelor', 'master', 'doctoral or professional'),
                        PRIMARY KEY (soc));

/* Note: low annual wages represent the 25th percentile, high annual wages
   represent the 75th percentile */
CREATE TABLE RegionalOccupation(soc CHAR(7),
                                zipCode CHAR(5),
                                lowAnnualWage INT UNSIGNED,
                                lowAnnualWageOutOfRange BOOLEAN,
                                medianAnnualWage INT UNSIGNED,
                                medianAnnualWageOutOfRange BOOLEAN,
                                highAnnualWage INT UNSIGNED,
                                highAnnualWageOutOfRange BOOLEAN,
                                PRIMARY KEY(soc, zipCode));
