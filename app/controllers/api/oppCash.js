const auth = require('../../../middleware/auth');
const { Opp, validate } = require('../../models/oppCash');
const express = require('express');
const router = express.Router();
// route to add new bill
router.post("/addNew",  async (req, res, next) => { 
  const opp = new Opp(req.body);
    opp.save().then(opp => {
    if(opp){
      res.status(200).json({success: true, message: "Cash Saved Successfully" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});



//count today total other cash
router.get("/today",async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  Opp.find({created_at: {$gte: startOfToday}})
  .then(opp => {
    if(opp){
      res.status(200).json(opp);
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
})
})


//get all other cash
router.get("/all",async(req,res, next) =>{
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  Opp.find({created_at: {$gte: startOfToday}})
  .then(opp => {
    if(opp){
      res.status(200).json(opp);
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
})
})



//count today total other cash
router.get("/todayTotal",async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  Opp.find({created_at: {$gte: startOfToday}})
  .then(opp => {
    todayCash = opp
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
  Opp.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(opp => {
    todayCash = opp
    let sum =0
    for(let i =0; i < todayCash.length ; i++){
      sum += todayCash[i].amount
    } res.status(200).json(sum);
    }) 
})

module.exports = router;








