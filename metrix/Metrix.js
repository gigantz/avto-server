const Mongoose = require('mongoose').Mongoose;
import bluebird from 'bluebird';
import path from 'path';
import config from 'config';
// Avto

const mongoose = new Mongoose();

class Metrix {
  constructor() {
  }

  init() {
    mongoose.connect(config.METRIX_DATABASE, { useMongoClient: true })
      .then(data => {
        if(data) console.log('\x1b[32m%s\x1b[32m', '⚡️  Metrix DB is connected');
        this.db = mongoose.connection;
        
        this.db.collection('system').insert({ message: `Metrix get started at ${Date()}` });
      }).catch(e => {
        console.log('\x1b[31m%s\x1b[31m', e)
      });
  }

  dispatch = async (event, userId = 'NOT LOGGED', body) => {
    try {
      await this.db.collection('metrix').insert({
        event,
        userId,
        body,
        date: Date()
      });

    } catch ({ message }) {
      await this.db.collection('logs').insert({
        message,
        event,
        date: Date()
      })
    }
  }

  getList = async (userId) => {
    if(!userId) return false;
    
    try {
      const list = await this.db.collection('metrix').find({ userId }).limit(30);
      return list;
    } catch (error) {
      console.log(`can't get user activity list`, error);
    }
  }
}

export default (new Metrix);