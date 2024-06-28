const drop = async (pool) => {
    await pool.query('USE SurveysDatabase');
    await pool.query('DROP TABLE IF EXISTS Users');
    await pool.query('DROP TABLE IF EXISTS Managers');
    await pool.query('DROP TABLE IF EXISTS Responses');
    await pool.query('DROP TABLE IF EXISTS Answers');
    await pool.query('DROP TABLE IF EXISTS Questions');
    await pool.query('DROP TABLE IF EXISTS Surveys');
    await pool.query('DROP TABLE IF EXISTS Results');
    await pool.query('DROP TABLE IF EXISTS RoleRelation');
    await pool.query('DROP TABLE IF EXISTS Roles');
    await pool.query('DROP DATABASE IF EXISTS SurveysDatabase');
};

const create = async (pool) => {
    // Create the database
    await pool.query('CREATE DATABASE IF NOT EXISTS SurveysDatabase');

    // Switch to the newly created database
    await pool.query('USE SurveysDatabase');

    //Create the roles table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Roles(
        name varchar(255) PRIMARY KEY
    );`);

    //Create the roleRelation table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS RoleRelation(
        username VARCHAR(255) PRIMARY KEY,
        roleName VARCHAR(255) NOT NULL,
        FOREIGN KEY (roleName) REFERENCES Roles(name)
    );`);

    // Create the users table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Users(
        id int AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        age INT NOT NULL, 
        gender VARCHAR(255) NOT NULL,
        job VARCHAR(255) NOT NULL,
        company varchar(255),
        FOREIGN KEY (username) REFERENCES RoleRelation(username)
    );`);

    //Create the managers table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Managers(
        id int AUTO_INCREMENT PRIMARY KEY,
        name varchar(255) NOT NULL,
        username varchar(255) NOT NULL UNIQUE,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        FOREIGN KEY (username) REFERENCES RoleRelation(username)
    );`);

    //Create the surveys table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Surveys(
        id int AUTO_INCREMENT,
        userId int NOT NULL,
        surveyName varchar(255),
        active bool NOT NULL,
        category varchar(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES Users(id)
    );`);

    //Create the questions table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Questions(
            id int AUTO_INCREMENT,
            question varchar(255),
            surveyID int NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (surveyID) REFERENCES Surveys(id)
        );
    `);

    //Create the answers table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Answers(
            id int AUTO_INCREMENT,
            answer varchar(255),
            questionId int NOT NULL,
            answerId int NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (questionId) REFERENCES Questions(id)
        );
    `);

    //Create the responses table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS results (
            id INT AUTO_INCREMENT PRIMARY KEY,
            surveyId INT NOT NULL,
            answerId INT NOT NULL,
            userId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

module.exports = { drop, create };
