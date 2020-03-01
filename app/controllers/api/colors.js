const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Company, validate } = require('../../models/companies');

const express = require('express');
const router = express.Router();

// route to add new colrs
router.post("/addNew",  async (req, res, next) => { 
  const company= new Company(req.body);
     // to check if the type is already registered
     let comp = await Company.findOne({ name: req.body.name});
     if (comp) return res.json({ success: false, message: 'Company already exists' });
  company.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Company Saved successful!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved!" });
    }    
  });
});



// route get all categories
router.get('/AllCompanies', async (req, res) => {
  Company.find().then(company => {
    if (company){
      res.status(200).json(company);
    }else{
      res.status(404).json({message: "company not found"});
    }
  })  
});



module.exports = router;








