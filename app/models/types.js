const Joi = require('joi');
const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
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
  sizes:{
    type:Array,
  } , 
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Type = mongoose.model('Type', typeSchema);

function validateType(Type) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.string().min(0).max(500).allow(''),
    sizes: Joi.allow('')
 };

  return Joi.validate(Type, schema);
}

exports.typeSchema = typeSchema;
exports.Type = Type;
exports.validate = validateType;




