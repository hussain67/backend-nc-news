# be-nc-news

This is the API for nc-news-shahid app that will provide information to the front-end architecture.

# Description

This will serve data for different end point requests from the front-end. This API was developed as a part of individual project work in the Northcoders coding bootcamp. This API is hosted in Heroku at the address "https://be-nc-news-shahid.herokuapp.com/api/". It's Github address is "https://github.com/hussain67/backend-nc-news".

# Technicals

This back-end was developed using node, express, psql, pg and pg-format. Jest and Supertest frameworks were used for testing purpose.

# How to run locally

## Installation to local machine

Clone the API from "https://github.com/hussain67/backend-nc-news".

Run the command `npm install`. This will install node_modules, express, dotenv, pg and pg-format as dependencies and jest, jest-sorted, and supertest as devDependencies.

Install Postgres App from "https://postgresapp.com".

## Additional files and contents

In the `/db/setup.sql`, file provide names for the test and development database.

Create .env.test and .env.development files in the project.

In the .env.test file include `PGDATABASE = <test_database_name>` and in the .env>development file include` PGDATABASE = <development_database_name>`. These database names should be exactly same as in the `/db/setup.sql` file.

Make sure that .env files are gitignored.

## Creation of databases

Open the Postgres app (little blue elephant) and select start.

Run the command `npm run setup-dbs`. This will create test and development databases.

## Creation of tables and seeding them

Run the command `npm run seed`. It will prompt Node to run the file `./db/seeds/run-seed.js`. This file requires `./db/connection.js` to connect to the database. It also requires `./db/seeds/seed.js` to create necessary tables and seed them.

## Running the test locally

Run the command `npm test`. It will prompt Jest to run the files in the `__tests__` folder and produce necessary test results.
