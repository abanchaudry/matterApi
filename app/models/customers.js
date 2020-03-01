const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    reference: {
        type: String,
    },
    detail: {
        type: String,
    },
    contact: {
        type: String,
    },
    pendingAmount:{
        type:Number,
        default:0
    },
    received:{
        type:Array,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});



const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
      name: Joi.string(),
      reference: Joi.string(),
      detail:Joi.string(),
      pendingAmount:Joi.allow(),
      received:Joi.allow(),
      contact: Joi.string()
    };

    return Joi.validate(customer, schema);
}


exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;