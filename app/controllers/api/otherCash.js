const auth = require('../../../middleware/auth');
const { Cash, validate } = require('../../models/otherCash');
const express = require('express');
const router = express.Router();

// route to add new bill
router.post("/addNew" ,async (req, res, next) => { 
  const cash = new Cash(req.body);
    cash.save().then(cash => {
    if(cash){
      res.status(200).json({success: true, message: "Cash Saved Successfully" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});



//count today total other cash
router.get("/today" ,async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  Cash.find({created_at: {$gte: startOfToday}})
  .then(cash => {
    if(cash){
      res.status(200).json(cash);
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
})
})


//get all other cash
router.get("/all" ,async(req,res, next) =>{
  Cash.find().sort({_id:-1})
  .then(cash => {
    if(cash){
      res.status(200).json(cash);
    }else{
      res.status(200).json({success: false, message: "Other cash not found!" });
    }    
})
})

//get  other cash by date 
router.get("/byDate" ,async (req, res, next) => {
  var startDate =  req.query.startDate;
  let startTest = new Date(startDate);
  startTest.setHours(0,0,0,0);
  var endTest = new Date(startDate)
  endTest.setHours(23,59,59,999);
  Cash.find({created_at: {$gte: startTest , $lt: endTest}})
  .then(cash => {
    if (cash){
      res.status(200).json(cash);
    }else{
      res.status(404).json({message: "cash not found"});
    }
  }) 
})

//count today total other cash
router.get("/todayTotal" ,async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  Cash.find({created_at: {$gte: startOfToday}})
  .then(cash => {
    todayCash = cash
    let sum =0
    for(let i =0; i < todayCash.length ; i++){
      sum += todayCash[i].amount
    } res.status(200).json(sum);
    }) 
})

//count  total other cash of date 
router.get("/countTotalByDate" ,async(req,res, next) =>{
  var startDate =  req.query.date;
  let fromDate = new Date(startDate);
  fromDate.setHours(0,0,0,0);
  var toDate = new Date(startDate)
  toDate.setHours(23,59,59,999);
  Cash.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(cash => {
    todayCash = cash
    let sum =0
    for(let i =0; i < todayCash.length ; i++){
      sum += todayCash[i].amount
    } res.status(200).json(sum);
    }) 
})

module.exports = router;








