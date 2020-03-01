const Joi = require('joi');
const mongoose = require('mongoose');
const cashSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  amount: {
    type: Number,
  },
  type: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  detail:{
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

const Cash = mongoose.model('Cash', cashSchema);

function validateCash(Cash) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    detail: Joi.allow(''),
    type: Joi.allow(''),
    amount:Joi.allow('')

 };

  return Joi.validate(Cash, schema);
}

exports.cashSchema = cashSchema;
exports.Cash = Cash;
exports.validate = validateCash;




