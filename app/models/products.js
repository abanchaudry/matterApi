const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  type: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  company: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  category: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  colorCode: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  size: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  quantity: {
    type: Number,
    minlength: 0,
    maxlength: 5000
  },
  purchasePrice:{
    type:Number,
    default:0
  },
  gst:{
    type:Number,
    default:0
  },
  otherCost:{
    type:Number,
    default:0
  },
  price:{
    type:Number,
  } , 
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Product = mongoose.model('Product', productSchema);

function validateProduct(Product) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.string().min(0).max(500).allow(''),
    type: Joi.string().min(0).max(500).allow(''),
    company: Joi.string().min(0).max(500).allow(''),
    colorCode: Joi.string().min(0).max(500).allow(''),
    category: Joi.string().min(0).max(500).allow(''),
    size: Joi.string().min(0).max(500).allow(''),
    quantity: Joi.min(0).max(500).allow(''),
    price: Joi.min(0).max(500).allow(''),
 };

  return Joi.validate(Product, schema);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProduct;




