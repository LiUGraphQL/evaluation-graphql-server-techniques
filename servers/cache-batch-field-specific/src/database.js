import Knex from "knex";

export default new Knex({
  client: "mysql2",
  connection: {
    host: "database",
    user: "test",
    password: "pass",
    database: "benchmark"
  },
  pool: { min: 0, max: 10 }
});
