const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Company, validate } = require('../../models/companyAccount');

const express = require('express');
const router = express.Router();

// route to save new company
router.post("/addNew", async (req, res, next) => { 
  const company= new Company(req.body);
     // to check if the type is already registered
     let comp = await Company.findOne({ name: req.body.name});
     if (comp) return res.json({ success: false, message: 'Company already exists' });
  company.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Company Account Created successfully!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved!" });
    }    
  });
});

// route to add new purchase
router.post("/addNewBill",  async (req, res, next) => { 
  const company = req.body.company;
  const bill = req.body.bill
  await Company.findOneAndUpdate({name: company},
    {$push: {      
        purchase: bill
      }
    }
  ).then(
    res.status(200).json({success :true , message : "bill save successfully"})
  )
});


// route to add new deposit  
router.post("/addNewDeposit",  async (req, res, next) => { 
  const company = req.body.company;
  const deposit = req.body
  await Company.findOneAndUpdate({name: company},
    {$push: {      
        deposit: deposit
      }
    }
  ).then(
    res.status(200).json({success :true , message : "bill save successfully"})
  )
});

// route get all companies
router.get('/AllCompanies',  async (req, res) => {
  Company.find().then(company => {
    if (company){
      res.status(200).json(company);
    }else{
      res.status(404).json({message: "company not found"});
    }
  })  
});

// route get all Deposit
router.get('/AllDeposit', async (req, res) => {
  let deposit = 0;
 let  allDeposit = []
 const allCompanies =await Company.find()
  // console.log("length" + (await allCompanies).length)
  for(let i = 0; i < (await allCompanies).length ; i ++){
      for(let j= 0; j < allCompanies[i].deposit.length; j++){
        deposit += allCompanies[i].deposit[j].amount
      }
  }
  res.status(200).json(deposit)
});

// route get all pending purchase bills
router.get('/pendingPurchaseBills', async (req, res) => {
  pendingBills =[]
 const allCompanies =await Company.find()
  for(let i = 0; i < (await allCompanies).length ; i ++){
      for(let j= 0; j < allCompanies[i].purchase.length; j++){
        if(allCompanies[i].purchase[j].status == "pending"){
          pendingBills.push(allCompanies[i].purchase[j])
        }
      }
  }
  res.status(200).json(pendingBills)
});

//update purchase bil
router.put('/updatePurchase', async (req, res) => {
  let companyName = req.body.companyName
  let purchaseId = req.body.purchaseId
  await Company.updateOne(
    {name: companyName, 'purchase._id' : purchaseId} , 
    {$set : { 'purchase.$.status' : 'Done' }},
    function(err) {
    if (err) throw err;  
      res.json({ success: true, message: 'your changes are updated successfully!'});
   })
});
// route get today Deposit
router.get('/AllTodayDeposit', async (req, res) => {
  let deposit = 0;
  let today = new Date()
  today.setHours(0,0,0)
 const allCompanies =await Company.find()
  for(let i = 0; i < (await allCompanies).length ; i ++){
      for(let j= 0; j < allCompanies[i].deposit.length; j++){
        if(new Date(allCompanies[i].deposit[j].date) >= today){
          deposit += allCompanies[i].deposit[j].amount
        } 
      }
  }
  res.status(200).json(deposit)
});

//count  total deposit by date
router.get("/countTotalByDate" ,async(req,res, next) =>{
  let deposit = 0;
  let today = new Date(req.query.date)
  today.setHours(0,0,0)
  var toDate = new Date(req.query.date)
  toDate.setHours(23,59,59,999);
 const allCompanies =await Company.find()
  for(let i = 0; i < (await allCompanies).length ; i ++){
      for(let j= 0; j < allCompanies[i].deposit.length; j++){
        if(new Date(allCompanies[i].deposit[j].date) >= today && new Date(allCompanies[i].deposit[j].date) <= toDate){
          deposit += allCompanies[i].deposit[j].amount
        } 
      }
  }
  res.status(200).json(deposit)
  })

module.exports = router;








