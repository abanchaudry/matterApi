const Joi = require('joi');
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  bill_no:{
    type :String,
  },
  sale: {
    type: Object,
  },
  customer_name:{
    type:String,
  },
  customer_reference:{
    type:String,
  },
  customer_contact:{
    type:String,
  },
  type: {
    type: String,
    default: "cash",
    minlength: 0,
    maxlength: 5000
  },
  credit_id:{
    type:String,
    minlength: 0,
    maxlength: 500
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Sale = mongoose.model('Sale', saleSchema);

function validateSale(Sale) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    bill_no: Joi.min(1).max(500),
    sale: Joi.allow(''),
    type: Joi.string().min(0).max(500).allow(''),
    credit_id:Joi.allow(''),
    cusomer_name:Joi.allow(''),
    customer_contact:Joi.allow(''),
    customer_reference:Joi.allow('')

 };

  return Joi.validate(Sale, schema);
}

exports.saleSchema = saleSchema;
exports.Sale = Sale;
exports.validate = validateSale;