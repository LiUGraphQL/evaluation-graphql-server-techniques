import { join } from "path";
import { lstatSync, readdirSync, readFileSync } from "fs";
import program from "commander";
import { request } from "graphql-request";
import prettyjson from "prettyjson";
import traverse from "traverse";

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
const queryTemplates = queryTemplatesDirs.map(dirPath => {
  const queryPaths = getFiles(dirPath);
  let queryTemplate = dirPath.split("/").pop();
  let queryTemplateNumber = queryTemplate.split("_").pop();

  const queries = queryPaths.map(path =>
    readFileSync(path, "utf-8", (err, data) => {
      if (err) throw err;
      return data;
    })
  );

  return {
    queryTemplate: queryTemplateNumber,
    queries: queries
  };
});

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const start = async () => {
  await asyncForEach(queryTemplates, async ({ queryTemplate, queries }) => {
    console.log("\n");
    console.log("QUERY TEMPLATE:", queryTemplate);
    await asyncForEach(queries, async (query, index) => {
      try {
        console.log("\n");
        console.log("Sending query:", index);
        let startTime = process.hrtime();
        const response = await request(SERVER_URL, query);
        let endTime = process.hrtime(startTime);
        console.log("Response recieved from query:", index);
        let leaves = traverse(response).reduce(function(acc, x) {
          if (this.isLeaf) acc.push(x);
          return acc;
        }, []);
        console.log("Number of leaf-nodes:", leaves.length);
        console.log("Query time: %ds %dms", endTime[0], endTime[1] / 1000000);
        // console.log(response);
      } catch (err) {
        console.log("ERROR - EXITING");
        console.log("QUERY:", query);
        console.log(prettyjson.render(err));
        process.exit(1);
      }
    });
  });
};

start();
