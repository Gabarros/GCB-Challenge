const { Router } = require('express');
const connection = require('./config/database');

const DoctorController = require('./app/controllers/DoctorController');

const routes = new Router();

routes.get('/doctors', DoctorController.index);

routes.post('/doctors', DoctorController.store);

routes.put('/doctors', DoctorController.update);

routes.delete('/doctors/:id', DoctorController.remove);


module.exports = routes;