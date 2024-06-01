// require('dotenv').config({ path: '.env' });  // טוען משתני סביבה מקובץ .env בתיקיית database
const cors = require('cors');
const express = require('express');
const managersRouter = require('./routes/managersRoute');
const usersRouter = require('./routes/usersRoute');
const suerveysRouter = require('./routes/surveysRoute');

// import cors from 'cors';
// import express from 'express';
// import managersRouter from './routes/managersRoute';
// import usersRouter from './routes/usersRoute';

const server = express();
const host = 'localhost';
const port = '3000';  

// Middleware
server.use(cors({ origin: '*' }));  
server.use(express.json());  

// Routes
server.use('/managers', managersRouter);
server.use('/users', usersRouter);
server.use('/surveys', suerveysRouter)


// Default Route
server.get('/', (req, res) => {
    res.send("Hello from surveys by Hadas & Tamar!!🤗");
});

// Start Server
server.listen(port, host, () => {
    console.log(`Listening to requests at http://${host}:${port}`);
});
