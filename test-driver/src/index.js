import cluster from "cluster";
import os from "os";
import { join } from "path";
import { lstatSync, readdirSync, readFileSync } from "fs";
import program from "commander";
import { request } from "graphql-request";
import prettyjson from "prettyjson";
import traverse from "traverse";
import _ from "lodash";

if (cluster.isMaster) {
  // MASTER

  program
    .version("0.0.1", "-v, --version")
    .option("-a, --actual-queries <path>", "Path to actualQueries folder.")
    .option("-c, --clients <clients>", "Number of clients", 1)
    .option(
      "-s --server <url>",
      "URL to the GraphQL server to test",
      "localhost"
    )
    .option("-p --port <port>", "Port used by the GraphQL server", "4000")
    .parse(process.argv);

  //request(SERVER_URL, query).then(data => console.log(prettyjson.render(data)));

  // Constants
  const numCPUs = os.cpus().length;
  const maxClients = numCPUs - 1; // The extra one here runs the graphQL server
  const actualQueriesPath = program.actualQueries;
  const SERVER_URL = "http://" + program.server + ":" + program.port;
  const numWorkers = Math.min(maxClients, program.clients);

  // Helper functions
  const isDirectory = source => lstatSync(source).isDirectory();
  const isFile = source => lstatSync(source).isFile();
  const getDirectories = source =>
    readdirSync(source)
      .map(name => join(source, name))
      .filter(isDirectory);

  const getFiles = source =>
    readdirSync(source)
      .map(name => join(source, name))
      .filter(isFile);

  // Parase and sort the queries
  const queryTemplatesDirs = getDirectories(actualQueriesPath);
  const queryTemplates = queryTemplatesDirs.map(dirPath => {
    const queryPaths = getFiles(dirPath);
    let queryTemplate = dirPath.split("/").pop();
    let queryTemplateNumber = queryTemplate.split("_").pop();

    const unChunkedQueries = queryPaths.map(path =>
      readFileSync(path, "utf-8", (err, data) => {
        if (err) throw err;
        return data;
      })
    );

    const chunkedQueries = _.chunk(
      unChunkedQueries,
      Math.ceil(unChunkedQueries.length / numWorkers)
    );

    return {
      queryTemplate: parseInt(queryTemplateNumber, 10),
      queries: chunkedQueries
    };
  });

  const sortedQueryTemplates = queryTemplates.sort((a, b) =>
    a.queryTemplate > b.queryTemplate ? 1 : -1
  );

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  cluster.on("message", (worker, { command, data }, handle) => {
    switch (command) {
      case "LOGDATA":
        console.log(`worker ${worker.id}:`, data);
    }
  });

  for (const id in cluster.workers) {
    cluster.workers[id].send({ command: "ECHO", data: "Hello there" });
  }

  // Send the queries to respective worker
  for (const id in cluster.workers) {
    console.log("worker id:", id);
    const queriesForWorker = sortedQueryTemplates.map(
      ({ queryTemplate, queries }) => ({
        queryTemplate,
        queries: queries[id - 1]
      })
    );

    cluster.workers[id].send({ command: "QUERIES", data: queriesForWorker });
  }

  for (const id in cluster.workers) {
    cluster.workers[id].send({ command: "START", data: SERVER_URL });
  }
} else {
  // WORKER
  console.log(`Worker ${process.pid} started`);

  let queryTemplates = {};

  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  const start = async SERVER_URL => {
    await asyncForEach(queryTemplates, async ({ queryTemplate, queries }) => {
      await asyncForEach(queries, async (query, index) => {
        try {
          let startTime = process.hrtime();
          const response = await request(SERVER_URL, query);
          let endTime = process.hrtime(startTime);
          let leaves = traverse(response).reduce(function(acc, x) {
            if (this.isLeaf) acc.push(x);
            return acc;
          }, []);
          // Send data about the sent query up to the master.
          process.send({
            command: "LOGDATA",
            data: {
              queryTemplate,
              timeMs: endTime[0] * 1000 + endTime[1] / 1000000,
              leafNodes: leaves.length
            }
          });
          // console.log(response);
        } catch (err) {
          console.log("ERROR - EXITING");
          console.log("QUERY:", query);
          console.log(prettyjson.render(err));
          process.exit(1);
        }
      });
    });
    process.exit(0);
  };

  process.on("message", ({ command, data }) => {
    switch (command) {
      case "ECHO":
        process.send({ command: "ECHO", data });
        break;
      case "QUERIES":
        // Queries recieved
        queryTemplates = data;
        process.send({ command: "ECHO", data });
        break;
      case "START":
        start(data);
        break;
    }
  });
}
