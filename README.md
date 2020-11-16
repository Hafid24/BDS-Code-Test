# BDS-Coding-Test
A browser application which receives, validates and displays data from a user.

# Requirements
* Postgres DB installed
* Node

# Technology stack used:
* `React` for frontend.
* `Chakra UI` for UI.
* `Node Express` for Back-end sevices.
* `Postgres` as a Databes.

# Config and Creating the DB table:
* Once Postgres installed:
  - `sudo -u postgres createuser <username>` to create a user if on Ubuntu.
  - `sudo -u postgres createdb <dbname>` to create a DB.
  - `sudo -u postgres psql` then run `alter user <username> with encrypted password '<password>';` on `psql=#` line to set a password.
  - `grant all privileges on database <dbname> to <username> ;` on `psql=#` for getting privileges o DB.
 * Once done (Creating a table and give it a Schema):
  - Copy the SQL commands in `./server/schema.sql` on `psql=#` to create an empty table the necessary columns
 * At the modify the `./server/.env` with your credentials.

# How to use
* Clone this repository.
* Once is cloned:
  - go to `/client` and install dependencies.
  - go to `/server` and run `Yarn`to install dependencies.
* Once the dependencies are installed, in the command line:
  - in /client, npm start.
  - in /server, nodemon start.
* Go to http://localhost:3000/ to access the Application if Browser did not open automatically..

