const Joi = require('joi');
const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
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
  crediterId:{
    type: String,
  },
  detail: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  pendingAmount:{
    type:Number,
  },
  reference:{
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

const Credits = mongoose.model('Credits', creditSchema);

function validateCredits(Credits) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    sale: Joi.allow(''),
    name: Joi.allow(''),
    detail: Joi.allow(''),
    pendingAmount: Joi.allow(''),
    credit_id:Joi.allow('')

 };

  return Joi.validate(Credits, schema);
}

exports.creditsSchema = creditSchema;
exports.Credits = Credits;
exports.validate = validateCredits;




