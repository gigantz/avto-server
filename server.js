import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

// Avto
import config from 'config';
import routes from 'routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

mongoose.Promise = bluebird;
mongoose.connect(config.DATABASE, err => {
  if(!err) {
    console.log('\x1b[32m%s\x1b[32m', '=> MongoDB is connected');
  } else {
    console.log('\x1b[31m%s\x1b[31m', '[!] MongoDB server is dead');
  }
});

app.listen(5000, () => {
  console.log(`Server is running at ${config.PORT}`);
});