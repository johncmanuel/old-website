const dotenv = require('dotenv').config();
const util   = require('util');


// MySQL Pool
const mysql = require('mysql');
const pool = mysql.createPool({
    host        : process.env.MYSQL_HOST,
    user        : process.env.MYSQL_USER,
    password    : process.env.MYSQL_PASS,
    database    : process.env.MYSQL_DB,
    port        : process.env.MYSQL_PORT
});


pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        else {
            console.error(error);
        }
    }
    if (connection) {
        console.log('Pool connected! Connected to pool as ID: ' + connection.threadId);
        connection.release();
    }
    return;
});

// Allows async/await to be used on pool.query function.
pool.query = util.promisify(pool.query);

module.exports = pool;
