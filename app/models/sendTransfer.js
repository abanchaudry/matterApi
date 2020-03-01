const Joi = require('joi');
const mongoose = require('mongoose');

const sendTransferSchema = new mongoose.Schema({
  user_id: {
    type: String,
    minlength: 0,
    maxlength: 500
  },
  sendTransfer: {
    type: Object
  },
  type: {
    type: String,
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

const SendTransfer = mongoose.model('SendTransfer', sendTransferSchema);

function validateSendTransfer(sendTransfer) {
  const schema = {
    user_id: Joi.string().min(0).max(500).allow(''),
    sendTransfer: Joi.string().min(0).max(1000).allow(''),
    type: Joi.string().min(0).max(5000).allow(''),
    detail: Joi.string().min(0).max(500).allow('')
 
  };

  return Joi.validate(sendTransfer, schema);
}

exports.sendTransferSchema = sendTransferSchema;
exports.SendTransfer = SendTransfer;
exports.validate = validateSendTransfer;




