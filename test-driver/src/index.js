import { join } from "path";
import { lstatSync, readdirSync, readFileSync } from "fs";
import program from "commander";
import { request } from "graphql-request";
import prettyjson from "prettyjson";

const SERVER_URL = "http://localhost:4000";

program
  .version("0.0.1", "-v, --version")
  .option("-a, --actual-queries <path>", "Path to actualQueries folder.")
  .parse(process.argv);

//request(SERVER_URL, query).then(data => console.log(prettyjson.render(data)));

// Path to actualQueries
const actualQueriesPath = program.actualQueries;

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

const queryTemplatesDirs = getDirectories(actualQueriesPath);
// TODO: Remove this .flat() and arrange the queries into groups
// TODO: This will help with time-tracking.
const queryPaths = queryTemplatesDirs.map(dirPath => getFiles(dirPath)).flat();

const queries = queryPaths.map(path =>
  readFileSync(path, "utf-8", (err, data) => {
    if (err) throw err;
    return data;
  })
);

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const start = async () => {
  await asyncForEach(queries, async (query, index) => {
    try {
      console.log("Sending query:", index);
      const response = await request(SERVER_URL, query);
      console.log("Response recieved from query:", index);
      // console.log(response);
    } catch (err) {
      console.log("ERROR - EXITING");
      console.log("QUERY:", query);
      console.log(err);
      process.exit(1);
    }
  });
};

start();
