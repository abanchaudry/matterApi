const Joi = require('joi');
const mongoose = require('mongoose');
const oppSchema = new mongoose.Schema({
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

const Opp = mongoose.model('Opp', oppSchema);

function validateOpp(Opp) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    detail: Joi.allow(''),
    type: Joi.allow(''),
    amount:Joi.allow('')

 };

  return Joi.validate(Opp, schema);
}

exports.oppSchema = oppSchema;
exports.Opp = Opp;
exports.validate = validateOpp;




