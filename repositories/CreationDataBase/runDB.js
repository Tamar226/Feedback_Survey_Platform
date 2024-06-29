const { create, drop } = require('./creation.js');

const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT
}).promise();

(async () => {
    try {
        await drop(pool);
        await create(pool);
    } catch (error) {
        console.error("error in DB", error);
    }
})();
