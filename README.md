# Database Searching

this project acts as proof of conecpt 'P.O.C' to compare the efficiency of using elasticsearch in fetching, scoring and sorting of data as opposed to direct database serach methods.

## Installation

1. Clone the repo to your local workspace.
2. Build the customized logstash docker image and start containers using `npm run docker:start`
3. Have a Database with name `bestinsurance_truclient`
4. Start the database migrations using `npm run db:up`
5. Add data to the `client`, `client_phone` and `client_contact` tables
6. Start the express app using `npm run start`
7. Project should now run on `localhost:3000`

after seeding the database, logstash will start syncing data with elasticsearch

## Endpoints

### Mysql

    `localhost:3000/search/sql?query={query}`

### Elasticsearch

    `localhost:3000/search/elastic?query={query}`

## Search Results

- With around ~2M data, SQL Searches take significant time of > 20 seconds.
- With the same data documents size, Elasticsearch queries takes < 1.5 second.
