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
}

module.exports = new DoctorController();