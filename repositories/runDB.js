import {create, drop} from './creation.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// require('dotenv').config();


export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port:process.env.PORT
}).promise();

(async () => {
    try {
        console.log({
            host: process.env,
            // user: process.env.MYSQL_USER,
            // password: process.env.MYSQL_PASSWORD,
            // database: process.env.MYSQL_DATABASE,
            // port:process.env.PORT
        });
        // await drop();
        // await create();
    } catch (error) {
        console.error(error);
    }
})();