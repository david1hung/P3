# p3
Passion

## Dependencies
This project uses Node.js. All dependencies are specified in `package.json`.

This project requires the use of MySQL. Currently, the project is configured to use the database `p3_test` through the passwordless user `p3_admin` who has all privileges to the `p3_test` database.

The Python scripts in the `scripts` folder depend on the [openpyxl](https://openpyxl.readthedocs.org/en/default/index.html) package.

## Getting Started
First, make sure Node.js and npm are installed. Then run

    npm install

which will install all the dependencies needed. Then you can run

    nodejs main.js

which will start the server on port 8080.

To populate the MySQL databases, first create a database called `p3_test` in MySQL. Then download an appropriate spreadsheet from the Bureau Labor of Statistics and execute `scripts/init_db`.

## Configuration

There are several files in the `config` folder that allow you to configure various application settings.

* `app-config.json`: This configures general application settings. Currently, it consists of 3 fields: hostname (needed for password reset links to work properly), port (the port number that the application listens for requests), and portRequired (whether the port number is required for URLs to be routed correctly, generally should be `true` when using localhost as the hostname, and `false` during production).
* 'db-config.json`: This configures the MySQL database settings.
* 'mail-config.json`: This configures the mail server that should be used when sending emails to users. Note that if you are using Gmail as the mail server, you will probably need to relax the security settings on the Gmail account with [this](https://www.google.com/settings/security/lesssecureapps) and [this](https://accounts.google.com/DisplayUnlockCaptcha). Therefore, it's recommended to use some throwaway email account for development.