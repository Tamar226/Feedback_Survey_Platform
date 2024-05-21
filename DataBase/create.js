import { pool } from './runDB.js';

export const drop = async () => {
    await pool.query('DROP TABLE IF EXISTS Users');
    await pool.query('DROP TABLE IF EXISTS Manager');
    await pool.query('DROP TABLE IF EXISTS answers');
    await pool.query('DROP TABLE IF EXISTS Questions');
    await pool.query('DROP TABLE IF EXISTS Surveys');
    await pool.query('DROP DATABASE IF EXISTS SurveysDatabase');
}

export const create = async () => {
    // Create the database
    await pool.query('CREATE DATABASE IF NOT EXISTS SurveysDatabase');

    // Switch to the newly created database
    await pool.query('USE SurveysDatabase');

    // Create the users table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Users(
        id int AUTO_INCREMENT, 
        name VARCHAR(255) NOT NULL, 
        username VARCHAR(255), 
        email VARCHAR(255) NOT NULL,  
        password VARCHAR(255) NOT NULL, 
        city VARCHAR(255) NOT NULL, 
        age VARCHAR(255) NOT NULL, 
        gender VARCHAR(255) NOT NULL, 
        job VARCHAR(255) NOT NULL, 
        PRIMARY KEY(id, username)
        );`
        );

    //Create the managers table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Managers(
        id int AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        company varchar(255) NOT NULL,
        PRIMARY KEY (id)
    );`);
    //Create the surveys table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Surveys(
        id int AUTO_INCREMENT,
        managerId int NOT NULL,
        surveyName varchar(255),
        active bool NOT NULL,
        PRIMARY KEY (id)
    );`);
    //Create the questions table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Questions(
        id int AUTO_INCREMENT,
        question varchar(255),
        surveyID int,
        PRIMARY KEY (id),
        FOREIGN KEY (surveyID) REFERENCES Surveys(id)
    );`);
    //Create the answers table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Answers(
        id int AUTO_INCREMENT,
        answer varchar(255),
        questionID int,
        PRIMARY KEY (id),
        FOREIGN KEY (questionID) REFERENCES Questions(id)
    );`);
    // //Create the responses table
    // await pool.query(`
    // CREATE TABLE IF NOT EXISTS Responses(
    //     id int AUTO_INCREMENT,
    //     answerID int,
    //     userID int,
    //     PRIMARY KEY (id),
    //     FOREIGN KEY (answerID) REFERENCES Answers(id),
    //     FOREIGN KEY (userID) REFERENCES Users(id)
    // );`);
    // //Create the comments table
    // await pool.query(`
    // CREATE TABLE IF NOT EXISTS Comments(
    //     id int AUTO_INCREMENT,
    //     comment varchar(255),
    //     responseID int,
    //     PRIMARY KEY (id),
    //     FOREIGN KEY (responseID) REFERENCES Responses(id)
    // );`);

};