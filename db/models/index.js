import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { databaseUrl } from "../../config";

const basename = path.basename(__filename);
const db = {};

// initialize db for all models
const sequelize = new Sequelize(databaseUrl, {
    pool: {
        max: 5,
        min: 0,
        acquire: 50000,
        idle: 10000,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

export default db;
