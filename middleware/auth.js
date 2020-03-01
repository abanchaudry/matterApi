const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// console.log('authoriz first')
router.use( function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JwtPrivate_Key);
     req.user = decoded;
    next(); 
  }
  catch (ex) {
    res.status(400).send('Access Denied Please contact with admin.');
  }
});

module.exports = router;
