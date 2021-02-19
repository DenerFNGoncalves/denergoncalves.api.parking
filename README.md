# PARKING API

## Requirements 

- Node.js v10+
- Postgres running on local instance
- Or, Docker;
- Or, Docker Compose;


### Running on standard way

First, do: 

  - npm install

This will ensure to download all dependencies required. Later on, you need to setup all environments variables in .env file - section shows the default values set. Make sure all database variables are set properly with your configuration.

Our next step is create the database. You can execute the follow script: 

 - npm run db-create

This will created a database according with DB_NAME variable set. If you have created it manually make sure to set DB_NAME. Now with the DB ready, you can run the migrations to create the db structure:

 - npm run db-migration

[Optionally]

This step you can jump off if you want to. This projects has some seeds used to run tests, but you can add it to your database doing the follow command:

  - npm run db-seedall

And undo it with:

  - npm run db-undoseed

**Warning: Since seeds are ploting fixed identifiers on database, make sure it isn't stored yet. 
#### Environment Variables

- NODE_ENV=development
- PORT=3037
- DB_HOST=localhost [db - to docker-compose]
- DB_USER=postgres 
- DB_PWD=postgres
- DB_NAME=parking 
- DB_PORT=5432

### Running

- Install dependencies - `npm i`
- Build project - `npm run build`
- Run project - `npm start`
- Go to swagger page - `localhost:3037/`

### Development 
- Run once - `npm run dev`

### Development 
- Run once - `npm test`