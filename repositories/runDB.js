import {create, drop} from './creation.js';
const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config({path:'../.env'});



export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port:process.env.PORT
    // host: 'localhost',
    //         user: 'root',
    //         // password: 'a1b2c3d4',
    //         // password: 'T50226',
    //         password: '1570',
    //         // database: 'SurveysDatabase',

            // port:'3306'
}).promise();

(async () => {
    try {
        // await drop();
        await create();
    } catch (error) {
        console.error("error in DB", error);
    }
})