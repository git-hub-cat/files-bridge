"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const isDev = process.env.NODE_ENV === "development";
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    host: "117.62.201.153",
    port: 3306,
    username: "root",
    password: "lierchun@2023Mysql",
    database: "emp",
    timezone: "+08:00",
    logging: () => isDev,
    pool: {
        max: 30,
        idle: 30000,
        acquire: 60000
    },
});
sequelize.authenticate().catch(err => console.error("mysql连接失败:::"));
exports.default = sequelize;
