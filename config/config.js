const dotenv = require("dotenv");
dotenv.config();

const {
    PGUSER,
    PGHOST,
    PGPORT,
    PGDATABASE,
    PGPASSWORD,
    PGSSLMODE,
} = process.env;

// DB connect Data
const dbConnectionData = {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    pgPort: PGPORT || 5432,
    dialect: "postgres",
    ssl: PGSSLMODE,
};

module.exports = {
    // Pointing To Development DB
    development: dbConnectionData,

    // Pointing To Production DB
    production: dbConnectionData,
};
