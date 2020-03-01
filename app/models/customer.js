require('dotenv').config();
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const saltRounds = 10;
const customerSchema = new mongoose.Schema({
    customerName:{
        type:String,
    },
    customerEmail:{
        type:String,
    },
    customerContact:{
        type:String,
    },
    customerGender:{
        type:String,
    },
    customerDob:{
        type:String,
    },
    customerHeight:{
        type:Number
    },
    customerWeight:{
        type:Number,
    },
    customerAddress:{
        type:String,
    },
    customerCity:{
        type:String,
    },
    password: {
        type: String,
        // required: true,
        // minlength: 5,
        // maxlength: 1024
    },
    role: {
        type: String,
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

customerSchema.methods.generateAuthToken = function () {
    const token = Jwt.sign({ _id: this._id, role: this.role , email: this.email}, process.env.JwtPrivate_Key,  {expiresIn: '2h'});
    return token;
}

// hash user password before saving into database
customerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const Customer = mongoose.model('CustomerAccount', customerSchema);

function validateCustomer(customer) {
    const schema = {
      customerName: Joi.string(),
      customerEmail: Joi.string().min(5).max(255).required().email(),
      password: Joi.string(),
    //   c: Joi.string(),
      customerContact: Joi.string(),
      customerAddress: Joi.string(),
      customerCity: Joi.string(),
      customerDob: Joi.string(),
      customerHeight: Joi.number(),
      customerWeight: Joi.number(),
      customerGender:Joi.string()
    };

    return Joi.validate(customer, schema);
}


exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;