const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const UserRouter = require('./users/userRouter')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

server.use(reqLogger);

server.use('/users', UserRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});



//custom middleware

function reqLogger(req, res, next) {
  const now = new Date();
  const method = req.method;
  const url = req.url;
    console.log(`\n${now}\n${method}\n${url}`)
    next();
};

module.exports = server;
