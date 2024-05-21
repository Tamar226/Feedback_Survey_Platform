import {create, drop} from './create.js';
// import {insert} from './insert.js';
import mysql from 'mysql2';
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
    // host: 'proccess.env.MYSQL_HOST',
    // user: 'proccess.env.MYSQL_USER',
    // password: 'proccess.env.MYSQL_PASSWORD',
    // // password: '1570',
    // database: 'proccess.env.MYSQL_DATABASE',
    // port:'proccess.env.PORT'
     host: 'localhost',
    user: 'root',
    password: 'T50226',
    // password: '1570',
    database: 'SurveysDatabase',
    port:'3306'
}).promise();

//runs on port 3306

(async () => {
    try {
        await drop();
        await create();
        // await insert(); //-default for start
    } catch (error) {
        console.error(error);
    }
})();