const Joi = require('joi');
const mongoose = require('mongoose');
const purchaseBillsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  bill: {
    type: Object,
  },
  company: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  description:{
    type : String,
  },
  status: {
      type:String,
  },
  billNo: {
    type:Number,
  },
  retailTotal:{
    type:Number,
  },
  purchaseTotal:{
    type:Number,
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Bills = mongoose.model('purchase', purchaseBillsSchema);

function validateBills(Bills) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    bill: Joi.allow(''),
    company: Joi.allow(''),
    description : Joi.allow(''),
    status: Joi.allow(''),
    type: Joi.allow(''),
    billNo: Joi.allow(''),
    totalBill: Joi.allow('')

 };

  return Joi.validate(Bills, schema);
}

exports.purchaseBillsSchema = purchaseBillsSchema;
exports.Bills = Bills;
exports.validate = validateBills;




