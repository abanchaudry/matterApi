const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  name: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  type:{
    type: String,
  },
  detail:{
    type: String,
  },
  contact:{
    type:String,
  },
  purchase:{
    type:Array,
    default:[]
  },
  deposit:{
    type:Array,
    default:[]
  }, 
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

},
{ minimize: false });

const Company = mongoose.model('CompanyAccount', companySchema);

function validateCompany(Company) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.string().min(3).max(500),
    detail: Joi.allow(''),
    contact:Joi.allow(''),
    purchase: Joi.allow(''),
    deposit: Joi.allow('')
 };

 return Joi.validate(Company, schema);
}

exports.companySchema = companySchema;
exports.Company = Company;
exports.validate = validateCompany;




