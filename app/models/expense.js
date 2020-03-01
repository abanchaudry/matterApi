const Joi = require('joi');
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  name: {
    type: String,
  },
  type: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  category:{
    type:String,
  },
  amount: {
    type: Number,
    minlength: 0,
    maxlength: 5000
  },
  detail: {
    type: String,
    minlength: 0,
    maxlength: 5000
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  updated_at: {
      type: Date
  }

});

const Expense = mongoose.model('Expense', expenseSchema);

function validateExpense(Expense) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    name: Joi.allow(''),
    type: Joi.string().min(0).max(500).allow(''),
    category: Joi.string().min(0).max(500).allow(''),
    amount: Joi.min(0).max(500).allow(''),
    detail: Joi.string().min(0).max(500).allow('')

 };

  return Joi.validate(Expense, schema);
}

exports.expenseSchema = expenseSchema;
exports.Expense = Expense;
exports.validate = validateExpense;




