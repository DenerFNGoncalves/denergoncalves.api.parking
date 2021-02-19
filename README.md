# PARKING API

## Requirements 

- Node.js v10+
- Postgres running on local instance
- Or, Docker;
- Or, Docker Compose;


### Preparing 
#### Standard way

First, do: 
```
  npm install
```

This will ensure to download all dependencies required. Later on, you need to setup all environments variables in [.env file](#Environment Variables). Make sure all database variables are set properly with your configuration.

Our next step is create the database. You can execute the follow script: 
```
  npm run db-create
```
This will created a database according with *DB_NAME* variable set. If you have created it manually make sure to set *DB_NAME*. Now with the DB is ready, you can run the migrations:
```
  npm run db-migration
```
##### Optional

This step you can jump off if you want to. This project has some seeds used to run tests, but you can add it to your database doing the follow command:
```
  npm run db-seedall
```
And undo it with:
```
  npm run db-undoseed
```
###### Warning: Since items inside seeds have fixed identifiers, make sure it isn't already stored.

If you successfully got till here, jump to [Running](#Runnig) section.

![party](https://media.giphy.com/media/Is1O1TWV0LEJi/giphy.gif)

### #Environment Variables
These are the variables used for the application. The .env file is used as a quickway to set it.
```
NODE_ENV=development
PORT=3037
DB_HOST=localhost [db - to docker-compose]
DB_USER=postgres 
DB_PWD=postgres
DB_NAME=parking
DB_PORT=5432
```
## #Running

If you wanna run using the start script, you need built it first.
```
npm run build
npm start
```

###### Development 
To run in dev mode use:
```
  npm run dev
```

###### Test
To run tests, use the default test command:
```
  npm test
```
![warning](https://media.giphy.com/media/ZECL3vwoHHkMrvVEca/giphy.gif)

**Important**: before running tests you need make sure two things:
- [x] NODE_ENV have to be set to 'test'. This will make sure migration and seeds are running on the right database.
- [x] The test database was created. You can use *db-create* script to do it, but remember: NODE_ENV=test.
 
