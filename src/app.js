const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

require('./database');

const routes = require('./routes');

class App {
  constructor() {
    

    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(cors());
    this.server.use(express.json());
    
  }

  routes(){
    this.server.use(routes);
  }
}

const app = new App();
module.exports = app.server;

