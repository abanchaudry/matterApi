const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Expense, validate } = require('../../models/expense');

const express = require('express');
const router = express.Router();

// route to add new sale 
router.post("/addNew",  async (req, res, next) => { 
  const expense = new Expense(req.body);
    expense.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Expense Saved Successful!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});

//route to get all expense
router.get("/allExpense" ,async (req, res, next) => { 
  Expense.find().sort({_id:-1}).then(expense => {
    if (expense){
      res.status(200).json(expense);
    }else{
        res.status(200).json({success: false, message: "No Expense !" });
    }
  }) 
});

router.get("/byDate",async (req, res, next) => {
  var startDate =  req.query.startDate;
  let fromDate = new Date(startDate);
  fromDate.setHours(0,0,0,0);
  var toDate = new Date(startDate)
  toDate.setHours(23,59,59,999);
  Expense.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(expense => {
    if (expense){
      res.status(200).json(expense);
    }else{
      res.status(404).json({message: "expense not found"});
    }
  }) 
})

router.get("/today" ,async (req, res, next) => {
  let fromDate = new Date();
  fromDate.setHours(0,0,0,0);
  var toDate = new Date()
  toDate.setHours(23,59,59,999);
  Expense.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(expense => {
    if (expense){
      res.status(200).json(expense);
    }else{
      res.status(404).json({message: "expense not found"});
    }
  }) 
})

//count  total expense of date 
router.get("/countTotalByDate" ,async(req,res, next) =>{
  var startDate =  req.query.date;
  let fromDate = new Date(startDate);
  fromDate.setHours(0,0,0,0);
  var toDate = new Date(startDate)
  toDate.setHours(23,59,59,999);
  Expense.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(expense => {
    todayExpense = expense
    let sum =0
    for(let i =0; i < todayExpense.length ; i++){
      sum += todayExpense[i].amount
    } res.status(200).json(sum);
    }) 
})

module.exports = router;








