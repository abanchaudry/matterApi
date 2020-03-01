const Joi = require('joi');
const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  companyName: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  colors: {
    type: Array,
  },  
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Color = mongoose.model('Color', colorSchema);

function validateColor(Company) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    companyName: Joi.string().min(0).max(500).allow(''),
    colors: Joi.allow(''),
 };

  return Joi.validate(Color, schema);
}

exports.colorSchema = colorSchema;
exports.Color = Color;
exports.validate = validateColor;




