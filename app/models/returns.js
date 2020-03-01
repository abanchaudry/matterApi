const Joi = require('joi');
const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  productId:{
    type:String,
  },
  billNo :{
    type:String,
  },
  productName:{
    type:String,
  },
  returns: {
    type: Object,
  },
  quantity: {
    type :String,
  },
  price:{
    type : Number,
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Returns = mongoose.model('Return', returnSchema);

function validateReturns(Returns) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    productId: Joi.string(),
    return: Joi.allow(''),
    quantity: Joi.allow(''),
    price : Joi.allow('')
 };

  return Joi.validate(Returns, schema);
}

exports.returnsSchema = returnSchema;
exports.Returns = Returns;
exports.validate = validateReturns;




