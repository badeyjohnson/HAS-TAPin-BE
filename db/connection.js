const dbConfig =
  process.env.NODE_ENV === "production"
    ? { client: "mysql", connection: `${process.env.DATABASE_URL}?ssl=true` }
    : require("../knexfile");

module.exports = require("knex")(dbConfig);
