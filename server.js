// require('dotenv').config({ path: '.env' });  // טוען משתני סביבה מקובץ .env בתיקיית database
const cors = require('cors');
const express = require('express');
const managersRouter = require('./routes/managersRoute');

const server = express();
const host = 'localhost';
const port = '3000';  

// Middleware
// server.use(cors({ origin: '*' }));  
server.use(express.json());  

// Routes
server.use('/managers', managersRouter);

// Default Route
server.get('/', (req, res) => {
    res.send("Hello from surveys by Hadas & Tamar!!🤗");
});

// Start Server
server.listen(port, host, () => {
    console.log(`Listening to requests at http://${host}:${port}`);
});
