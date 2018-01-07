import bluebird from 'bluebird';
import mongoose from 'mongoose';
import config from 'config';
import Users from 'models/Users';

const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: config.WS });
const clients = {};

mongoose.Promise = bluebird;
mongoose.connect(config.DATABASE, err => {
  if(!err) {
    console.log('\x1b[32m%s\x1b[32m', '=> MongoDB is connected');
  } else {
    console.log('\x1b[31m%s\x1b[31m', '[!] MongoDB server is dead');
  }
});

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws) {
  ws.on('message', msg => {
    incoming(msg, ws);
  });
});

const interval = setInterval( async () => {
  for (let clientId in clients) {

    if(clients[clientId] === undefined) {
      delete clients[clientId];
      return false;
    }

    if (clients[clientId] && !clients[clientId].isAlive){
      clients[clientId].terminate();
      delete clients[clientId];
      return false;
    };

    clients[clientId].isAlive = false;
    clients[clientId].ping('', false, true);
  }

  console.log('------------------------------------')
  console.log(`Online: ${Object.keys(clients).length}`);
  console.log('------------------------------------')

  for(let clientId in clients) {
    if(clientId.indexOf('guest') > -1){
      return false;
    }

    const logs = await getLogs(clientId);
    if(logs) clients[clientId].send(logs);
  }
}, config.WS_INVERVAL);

const CONNECT_ME = "CONNECT_ME";
const DISCONNECT_ME = "DISCONNECT_ME";

const incoming = (actionJSON, ws) => {
  console.log(actionJSON);
  const action = JSON.parse(actionJSON);
  switch(action.type) {
    case CONNECT_ME:
      // console.log(`${action.payload._id} connected`);
      ws.isAlive = true;
      ws.on('pong', heartbeat);
      clients[action.payload.userId] = ws;
      userOnline(action.payload.userId, true, ws);
      break;
      
    case DISCONNECT_ME:
      // console.log(`${action.payload._id} disconnected`);
      clients[action.payload.userId] = undefined;
      userOnline(action.payload.userId, false, ws);
      break;

    default:
      break;
  }
}

const getLogs = async (userId) => {
  try {
    const user = await Users.findOne({ userId }, { logs: 1 });
    if(user) {
      return JSON.stringify({
        type: "WS_LOGS",
        payload: user.logs
      });
    }
  } catch (error) {
    return false;
  }
}

const userOnline = (userId, online, ws) => {
  Users.findOneAndUpdate({ userId }, { online })
    .then((res, error) => {
      if(res) {
        ws.send(JSON.stringify({
          type: "WS_USER_UPDATES",
          payload: online ,
          meta: { prop: 'online'}
        }));
      }
    }).catch(() => {});
}

const usersOnline = (ws) => {
  const clientsArray = Object.keys(clients);
  Users.find({ userId: clientsArray }, { userId: 1, firstname: 1, lastname: 1 })
    .then((res, error) => {
      if(res) {
        ws.send(JSON.stringify({
          type: "WS_REALTIME",
          payload: res,
          meta: { prop: 'peopleOnline'}
        }));
      }
    }
  ).catch(() => {});
}

const invervalOnlineUsers = setInterval(() => {
  for(let clientId in clients) {
    if(clientId.indexOf('guest') > -1){
      return false;
    }
    usersOnline(clients[clientId]);
  }
}, 1000)