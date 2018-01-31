import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import toobusy from 'toobusy-js';
import fileUpload from 'express-fileupload';
import path from 'path';
import cluster from 'cluster';
const numCPUs = require('os').cpus().length;
// Avto
import config from 'config';
import routes from 'routes';
import http from 'http';
import fs from 'fs';

import Mailer from 'utils/email';

global.Verification = Verification;

import Metrix from './metrix';

const app = express();

app.use(function(req, res, next) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

app.use('/files', express.static(path.resolve('./files')))
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

process.on('SIGINT', function() {
  server.close();
  toobusy.shutdown();
  process.exit();
});

mongoose.Promise = bluebird;
mongoose.connect(config.DATABASE, { useMongoClient: true })
  .then(data => {
    if(data) console.log('\x1b[32m%s\x1b[32m', '⚡️  MongoDB is connected');
  }).catch(e => console.log('\x1b[31m%s\x1b[31m', e.message));

  Metrix.init();
  Mailer.init();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  console.log(`Worker ${process.pid} started`);

  app.get('/cluster', (req, res) => {
    let worker = cluster.worker.id;
    res.send(`Running on worker with id ==> ${worker}`);
  });

  http.createServer(app).listen(config.PORT, () => {
    console.log(`Server is running at ${config.PORT}`);
  })
}