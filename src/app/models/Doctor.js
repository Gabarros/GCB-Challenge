const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Doctor extends Model{

  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        crm: Sequelize.STRING,
        telephone: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        specialties: Sequelize.JSON

      },
      {
        sequelize
      }
    );
      return this;

  }
};

module.exports = Doctor;