import cluster from "cluster";
import os from "os";
import { join } from "path";
import fs, { writeFile, lstatSync, readdirSync, readFileSync } from "fs";
import _ from "lodash";
import program from "commander";
import { Parser } from "json2csv";

// MASTER
export default () => {
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
    .option(
      "-t --type <type>",
      "Type of test to run, tp (throughput) or dbc (database-count).",
      "tp"
    )
    .parse(process.argv);

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

    const unChunkedQueries = queryPaths.map((path, index) => {
      const data = readFileSync(path, "utf-8", (err, data) => {
        if (err) throw err;
        return data;
      });
      return { index: index + 1, data };
    });

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

  let collectedData = [];

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);

    if (Object.keys(cluster.workers).length === 0) {
      // Time to convert data to some csv
      console.log("All workers are done.");
      const fields = [
        { label: "Query Template", value: "queryTemplate" },
        { label: "Query Number", value: "queryNumber" },
        { label: "Time (ms)", value: "timeMs" },
        { label: "Leaf nodes", value: "leafNodes" },
        { label: "Error", value: "error" }
      ];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(collectedData);
      // Create output dir if it doesn't exist
      if (!fs.existsSync("output")) fs.mkdirSync("output");
      // Write to file
      writeFile(
        `output/test-${new Date().toISOString()}.csv`,
        csv,
        { encoding: "utf-8" },
        err => {
          if (err) throw err;
          console.log("Output has been saved, exiting");
          process.exit();
        }
      );
    }
  });

  cluster.on("message", (worker, { command, data }, handle) => {
    switch (command) {
      case "LOGDATA":
        console.log(`worker ${worker.id}:`, data);
        collectedData.push(data);
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
    cluster.workers[id].send({
      command: "START",
      data: { url: SERVER_URL, type: program.type }
    });
  }
};
