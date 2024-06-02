import cors from 'cors';
import express from 'express';

import managersRouter from './routes/managersRoute'
import usersRouter from './routes/usersRoute'
import suerveysRouter from './routes/surveysRoute'

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


