const Joi = require('joi');
const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema({
  userId: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  name: {
    type: String,
    
  },
  price: {
    type: Array,
    default: []
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

  

});

const Price = mongoose.model('price', pricesSchema);

function validatePrice(Price) {
  const schema = {
    userId: Joi.string().min(0).max(500).allow(''),
    name: Joi.string(),
    price: Joi.allow(''),
  };

  return Joi.validate(Price, schema);
}

exports.pricesSchema = pricesSchema;
exports.Price = Price;
exports.validate = validatePrice;







