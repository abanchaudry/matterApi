const Joi = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  package: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  billNo:{
    type:String,
  },
  packageType: {
    type: String,
  },
  days: {
    type: String,
  },
 
  meals: {
    type: String,
  },
 
  snacks: {
    type: String,
  },
 
  activityLevel: {
    type: String,
  },
 
  exclusions: {
    type:Array,
  },
 
  mealPrice: {
    type: Number,
  },
 

  snackPrice: {
    type: Number,
  },
 
  customerName: {
    type: String,
  },
 
  customerEmail: {
    type: String,
  },
 
  customerContact: {
    type: String,
  },
 
  customerGender: {
    type: String,
  },
 
  customerDob: {
    type: String,
  },
 
  customerHeight: {
    type: String,
  },
 
  customerWeight: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  customerCity: {
    type: String,
  },
  startingDate: {
    type: String,
  },
  customProtien: {
    type: String,
  },
  customCarbs: {
    type: String,
  },
  customFat: {
    type: String,
  },

  billTotal:{
   type:Number,
 },
 exclusion_update:{
  type: Date,
  default: ''
 },
 scheduleChange:{
   type:Array,
   default:[]
 },
 status:{
   type:String,
   default: "pending"
 },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Orders= mongoose.model('Order', orderSchema);

function validateOrder(Orders) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.allow(''),
    type: Joi.string().min(0).max(500).allow(''),
    quantity: Joi.string().min(0).max(500).allow(''),
    detail: Joi.string().min(0).max(500).allow('')

 };

  return Joi.validate(Orders, schema);
}

exports.orderSchema = orderSchema;
exports.Orders = Orders;
exports.validate = validateOrder;




