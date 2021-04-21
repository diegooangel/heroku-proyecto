
const mysql = require('mysql');
const util = require('util');
const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME
} = process.env;

let pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    password: DB_PASS,
    user: DB_USER,
    database: DB_NAME,
    connectionLimit: 10
});

pool.query = util.promisify(pool.query);

module.exports = pool;

