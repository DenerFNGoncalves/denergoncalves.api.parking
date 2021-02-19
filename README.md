# PARKING API

## Requirements 

- Node.js v10+
- Postgres running on local instance
- Or, Docker / Docker Compose;


### Preparing 
#### Standard way

First, do: 
```
  npm install
```

This will ensure to download all dependencies required. Later on, you need to setup all environments variables in [.env file](#### Environment Variables). Make sure all database variables are set properly with your configuration.

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

#### Environment Variables
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
## Running

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
 
 
## Using Docker
If you plan to use docker to run the application you can just run `docker-compose up` inside the root path. Or follow these steps. First build the image: 
```
  docker build -t parking-api .
 ```
Image done. Before running it, follow the steps to run database inside docker too (if you plan to, otherwise you can skip).

```sh
docker run \
	--name postgres \
	-e POSTGRES_PASSWORD=postgres \
	-e POSTGRES_USER=postgres \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-d \
	postgres	
```

Running parking-api: Here we got some caveats before proceeding: 
* - 1) If you are running with postgres from a container the run command should contain `--link postgres` 
* - 2) If you plan to run as dev-mode, your .env file must have the same values passed on the command run. 
* - 3) If you gonna use database local, you might get some permission block depending your SO and Docker version. So you need to set DB_HOST properly. [This probably helps](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)
* - 4) Before executing remember to use database scripts - `db-create and db-migration` 

Samples:
```sh
# Using db from local machine on windows docker
docker run \
    --name parking-api \
    -e DB_HOST=host.docker.internal \
    -e DB_PORT=5432 \
    -e DB_USER=postgres \
    -e DB_PWD=postgres \
    -e DB_NAME=parking_dev \
    -e PORT=3037 \
    -p 3037:3037 \
	parking-api \
	npm run db-create && \
	npm run db-migration && \
  npm run dev
```

```sh
# Using container
docker run \
  --name parking-api \
	--link postgres \
    -e NODE_ENV=test
    -e DB_HOST=postgres \
    -e DB_PORT=5432 \
    -e DB_USER=postgres \
    -e DB_PWD=postgres \
    -e DB_NAME=parking_test \
    -e PORT=3037 \
    -p 3037:3037 \
	parking-api \
	npm run db-create && \
	npm test
```

 Any trouble with your var that require executing again, remember stopping container and removing it. You probably won't wanna use db scritps again, too. So remove it.
  ```sh
 docker stop parking-api
 docker rm parking-api
 ```

