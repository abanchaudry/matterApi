const Joi = require('joi');
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  name:{
    type:String,
  },
  contact:{
      type:String,
  },
  detail:{
    type:String,
  },
  salary: {
    type: Number,
  },
  type: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  receivedAmount:{
    type:[],
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Employee = mongoose.model('Employee', employeeSchema);

function validateEmployee(Employee) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.allow(''),
    contact: Joi.allow(''),
    salary: Joi.allow(''),
    detail: Joi.allow(''),
    type: Joi.allow(''),
    receivedAmount:Joi.allow('')

 };

  return Joi.validate(Employee, schema);
}

exports.employeeSchema = employeeSchema;
exports.Employee = Employee;
exports.validate = validateEmployee;
