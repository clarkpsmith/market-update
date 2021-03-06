"use strict";

/** Database setup for market update. */

const { Client } = require("pg");
const { getDatabaseUri } = require("./config/config");

const db = new Client({
  connectionString: getDatabaseUri(),
});

db.connect();

module.exports = db;
