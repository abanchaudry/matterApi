const Joi = require('joi');
const mongoose = require('mongoose');
const billsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  sale: {
    type: Object,
  },
  name: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  reference: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  contact:{
    type:String,
  },
  billNo: {
    type:Number,
  },
  receivedAmount:{
    type:Number,
  },
  returns:{
    type:Array,
    default:[]
  },
  dueId:{
    type:String,
  },
  type:{
      type:String,
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Bills = mongoose.model('Bills', billsSchema);

function validateBills(Bills) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    sale: Joi.allow(''),
    name: Joi.allow(''),
    reference: Joi.allow(''),
    contact: Joi.allow(''),
    type: Joi.allow(''),
    billNo: Joi.allow(''),
    dueId: Joi.allow(''),
    receivedAmount:Joi.allow('')

 };

  return Joi.validate(Bills, schema);
}

exports.billsSchema = billsSchema;
exports.Bills = Bills;
exports.validate = validateBills;




