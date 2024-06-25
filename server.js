const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser'); 

const usersRouter = require('./routes/usersRoute');
const surveysRouter = require('./routes/surveysRoute');
const managersRouter = require('./routes/managersRoute');
const questionsRouter = require('./routes/questionsRoute');
const answersRouter = require('./routes/answersRoute'); 

const server = express();
const host = 'localhost';
const port = '3000';  

// Middleware
server.use(cors({ origin: '*' }));  
server.use(express.json());  




server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// Routes
server.use('/managers', managersRouter);
server.use('/users', usersRouter);
server.use('/surveys', surveysRouter);
server.use('/questions', questionsRouter);
server.use('/answers', answersRouter);

// Default Route
server.get('/', (req, res) => {
    res.send("Hello from surveys by Hadas & Tamar!!🤗");
});

// Start Server
server.listen(port, host, () => {
    console.log(`Listening to requests at http://${host}:${port}`);
});
