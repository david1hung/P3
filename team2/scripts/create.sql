DROP TABLE IF EXISTS Occupation;

CREATE TABLE Occupation(soc CHAR(7),
                        title VARCHAR(255),
                        currentEmploymentThousands DECIMAL(7, 1) UNSIGNED,
                        futureEmploymentThousands DECIMAL(7, 1) UNSIGNED,
                        jobOpeningsThousands DECIMAL(7, 1) UNSIGNED,
                        medianAnnualWage INT UNSIGNED,
                        medianAnnualWageOutOfRange BOOLEAN,
                        educationRequired ENUM('none', 'high school', 'some college', 'postsecondary nondegree', 'associate', 'bachelor', 'master', 'doctoral or professional'),
                        PRIMARY KEY (soc));
