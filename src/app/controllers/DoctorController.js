const Yup = require('yup');

const Doctor = require('../models/Doctor');

class DoctorController{

  async store(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      crm: Yup.string().required(),
      telephone: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      specialties: Yup.object().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const doctorExists = await Doctor.findOne({
      where: { name: req.body.name }
    });

    if(doctorExists){
      return res.status(400).json({
        error: "Doctor already exists!"
      });
    }

    const { id, name, crm, telephone, state, city, specialties } = await Doctor.create(req.body).catch(err =>{
      console.error(err);
    });

    return res.json({
      id,
      name,
      crm,
      telephone,
      state,
      city, 
      specialties
    });
  }

  async remove(req, res){
    const id = req.params.id;

    const doctor = await Doctor.findByPk(id).catch(err => {
      return res.status(400).json({ error: err });
    });

    if(!doctor){
      return res.status(400).json({ error: 'Not found' });
    }

    doctor.destroy();
    return res.status(200).json(doctor);


  }

  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      crm: Yup.string().required(),
      telephone: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      specialties: Yup.object().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(404).json({ error: 'Validation Fails'});
    }

    const { id, name, crm, telephone, state, city, specialties } = req.body;
    
    const doctor = await Doctor.findByPk(id).catch(err => {
      return res.status(404).json({ error: err});
    });

    if(!doctor){
      return res.status(404).json({ error: 'Not Found'});
    }


    await doctor.update({ id, name, crm, telephone, state, city, specialties }).catch(err => {
      return res.status(400).json({ error: err});
    });

    return res.status(200).json(doctor);
    
  }

  async index(req, res){
    const doctors = await Doctor.findAll({
      attributes: ['id', 'name', 'crm', 'state', 'city', 'specialties']
    }).catch(err => {
      return res.status(400).json(err);
    });

    return res.status(200).json(doctors);
  }

}

module.exports = new DoctorController();