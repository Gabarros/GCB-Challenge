const { Router } = require('express');
const connection = require('./database/config');

const DoctorController = require('./app/controllers/DoctorController');

const routes = new Router();

routes.get('/doctors', (req, res) => {

  connection.query('SELECT * FROM doctors', (err, rows, fields) => {
    if(!err){
      res.send(rows);
    }else{
      console.log(err);
    }
  })

  return res.status(200).json({ acesso: 'Acessado' });
});

routes.post('/doctors', DoctorController.store);

routes.put('/doctors', (req, res) => {
  const { name, crm, telephone, state, city, specialties } = req.body;
  return res.status(200).json({ name, crm, telephone, state, city, specialties });

});

routes.delete('/doctor/:id', (req, res) => {
  const id = req.params.id;
  return res.json({ "deletado o médico": id });
});


module.exports = routes;