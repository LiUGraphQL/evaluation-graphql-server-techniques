# GraphQL Benchmarker

This repo contains three different parts.

1. A GraphQL server implementation
2. Database
3. Test-driver

# Usage

To setup and run the server/database together just run the docker-compose files.

For development:
```
docker-compose -f docker-compose.dev.yaml up
```
For production:
```
docker-compose up
```
   
## GraphQL server implementation

This folder contains a server implementation that is intended to test different techniques that can be used when writing the resolvers for a GraphQL server.
Such as caching and batching.

This server is implemented to work together with the mysql database in the database folder.

## Database

This folder contains the BSBMtools used to generate the dataset that is used in this project.
The dockerfile accompanying the tools uses the tools to run the generator and inserts them into a mysql database.
This image is used to easily spin up a database with generated data.

#### Usage

NOTE: Preferbly this is not done, use the docker-compose files instead.

1. Build the image using a chosen products multiplier.

```
docker build -t benchmark-db --build-arg pc=2000 .
```

Default: pc=1000

2. Run the database.
```
docker run -d -p 3306:3306 --name benchmark-db -e MYSQL_ROOT_PASSWORD=supersecret benchmark-db
```
3. It is now possible to reach the database on port 3306 or you can access it using the following command.

```
docker exec -it benchmark-db bash
```

## Test-driver

The program will together with given query-templates and variables benchmark the server.
It will record the time it takes for each query to return from the server.
It should be possible to tell the test-driver to run several "clients" at the same time to simulate concurrent requests to the server.