const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./database/config');

const routes = require('./routes');

class App {
  constructor() {

    

    this.server = express();

    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares(){
    this.server.use(cors());
    this.server.use(express.json());
    
  }

  routes(){
    this.server.use(routes);
  }

  database(){
    database.connect(function(err){
      if(err) console.error(err);
      console.log("Connected!");
    
    });

  }
}

const app = new App();
module.exports = app.server;

