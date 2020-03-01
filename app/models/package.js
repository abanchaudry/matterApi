const Joi = require('joi');
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 1,
    maxlength: 500
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 5000
  },
  meals:{
    type: Array,
    default:[]
  },
  snacks:{
    type:Array,
    default:[]
  } , 
  detail:{
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

},
{ minimize: false });

const Package = mongoose.model('Package', packageSchema);

function validatePackage(Package) {
  const schema = {
    userId: Joi.string().min(1).max(500),
    name: Joi.string().min(1).max(500),
    meals: Joi.allow(''),
    snacks: Joi.allow(''),
    detail: Joi.allow('')
 };

  return Joi.validate(Package, schema);
}

exports.packageSchema = packageSchema;
exports.Package = Package;
exports.validate = validatePackage;




