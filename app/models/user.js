require('dotenv').config();
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const saltRounds = 10;
const userSchema = new mongoose.Schema({

    customerEmail:{
        type:String,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
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

userSchema.methods.generateAuthToken = function () {
    const token = Jwt.sign({ _id: this._id, role: this.role , email: this.customerEmail}, process.env.JwtPrivate_Key,  {expiresIn: '2h'});
    return token;
}

//hash user password before saving into database
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      customerEmail: Joi.string(),
      password: Joi.string()
    };

    return Joi.validate(user, schema);
}


exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;