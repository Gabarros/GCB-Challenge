const Sequelize = require('sequelize');

const Doctor = require('../app/models/Doctor');

const databaseConfig = require('../config/database');

const models = [ Doctor ];

class Database{
  constructor(){
    this.init();

  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();