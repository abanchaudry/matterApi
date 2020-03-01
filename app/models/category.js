const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
  subCat: {
      type : Array
  },  
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(Category) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.string().min(0).max(500).allow(''),
    subCat: Joi.allow('')
 
  };

  return Joi.validate(Category, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;




