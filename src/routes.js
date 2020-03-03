const { Router } = require('express');


const routes = new Router();

routes.get('', (req, res) => {
  return res.status(200).json({ acesso: 'Acessado'});
} );

routes.post('/doctor', (req, res) => {
  const { name, crm, telephone, state, city, specialties } = req.body;
  return res.status(200).json({name, crm, telephone, state, city, specialties});


});

routes.delete('/doctor/:id', (req, res) => {
  const id = req.params.id;
  return res.json({ "deletado o médico": id });
})


module.exports = routes;