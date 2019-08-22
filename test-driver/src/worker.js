import { request } from "graphql-request";
import prettyjson from "prettyjson";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

export default () => {
  console.log(`Worker ${process.pid} started`);
  let queryTemplates = {};

  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  const databaseRequestTest = async url => {
    let db;
    try {
      db = await mysql.createConnection({
        host: "localhost",
        user: "test",
        password: "pass",
        database: "benchmark",
        Promise: bluebird
      });
    } catch (err) {
      console.error("ERROR: Cannot connect to database.");
      process.exit(1);
    }

    await asyncForEach(queryTemplates, async ({ queryTemplate, queries }) => {
      await asyncForEach(queries, async ({ index, data }) => {
        try {
          const [rows] = await db.query("SHOW GLOBAL STATUS LIKE 'com_select'");
          const { Value: preQuery } = rows[0];
          await request(url, data);
          const [rowsAfter] = await db.query(
            "SHOW GLOBAL STATUS LIKE 'com_select'"
          );
          const { Value: afterQuery } = rowsAfter[0];
          // Send data about the sent query up to the master.
          const dbRequests = parseInt(afterQuery) - parseInt(preQuery);
          process.send({
            command: "LOGDATA",
            data: {
              queryTemplate,
              queryNumber: index,
              dbRequests,
              error: 0
            }
          });
          // console.log(response);
        } catch (err) {
          console.log("ERROR - EXITING");
          console.log("QUERY:", data);
          console.log(prettyjson.render(err));
          process.exit(1);

          // Send up information anyway
          process.send({
            command: "LOGDATA",
            data: {
              queryTemplate,
              queryNumber: index,
              error: 1
            }
          });
        }
      });
    });
  };

  const throughputTest = async url => {
    await asyncForEach(queryTemplates, async ({ queryTemplate, queries }) => {
      await asyncForEach(queries, async ({ index, data }) => {
        try {
          let startTime = process.hrtime();
          await request(url, data);
          let endTime = process.hrtime(startTime);

          let totalTime = endTime[0] * 1000 + endTime[1] / 1000000;
          totalTime = Math.round((totalTime * 100) / 100);
          // Send data about the sent query up to the master.
          process.send({
            command: "LOGDATA",
            data: {
              queryTemplate,
              queryNumber: index,
              timeMs: totalTime,
              error: 0
            }
          });
        } catch (err) {
          console.log("ERROR - EXITING");
          console.log("QUERY:", data);
          console.log(prettyjson.render(err));
          process.exit(1);

          // Send up error
          process.send({
            command: "LOGDATA",
            data: {
              queryTemplate,
              queryNumber: index,
              timeMs: -1,
              error: 1
            }
          });
        }
      });
    });
    process.exit(0);
  };

  const start = async ({ url, type }) => {
    switch (type) {
      case "dbc":
        databaseRequestTest(url);
        break;
      case "tp":
        throughputTest(url);
        break;
    }
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
};
