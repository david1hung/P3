DROP TABLE IF EXISTS Occupation;

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
