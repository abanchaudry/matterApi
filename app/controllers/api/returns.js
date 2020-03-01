const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Returns, validate } = require('../../models/returns');
const { Bills } = require ('../../models/bills');

const express = require('express');
const router = express.Router();

// route to add new return
router.post("/addNew",async (req, res, next) => { 
  returnItem = 0 
  let bill = await  Bills.findOne({billNo: req.body.billNo}) 
    for (let index = 0; index < bill.returns.length; index++) {
      if(bill.returns[index].productId == req.body.productId){
        returnItem += bill.returns[index].quantity
      } 
    }
    let tQuantity =  req.body.quantity + returnItem
    if(tQuantity > req.body.totalQuantity){
      res.status(200).json({success:false, message : "Item Already Return Please Contact With Manager"})
      return
    }
    else{
      console.log("start")
    }
  const returns = new Returns(req.body);
  await Bills.findOneAndUpdate({billNo: req.body.billNo},
    {$push: {      
        returns: req.body
      }
    })
    returns.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "Return Save Successfully Please Give Back Money!!!!!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});



// route to get all returns
router.get("/allReturns" ,async (req, res, next) => { 
  Returns.find().then(returns => {
    if (returns){
      res.status(200).json(returns);
    }else{
      res.status(404).json({message: "returns not found"});
    }
  }) 
});

//route to get today returns
router.get("/today" ,async (req, res, next) => {
  let fromDate = new Date();
  fromDate.setHours(0,0,0,0);
  var toDate = new Date()
  toDate.setHours(23,59,59,999);
  Returns.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(returns => {
    if (returns){
      res.status(200).json(returns);
    }else{
      res.status(404).json({message: "returns not found"});
    }
  }) 
})

router.get("/todayTotalReturns",async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Returns.find({created_at: {$gte: startOfToday}})
  .then(returns => {
    todayReturn = returns
    let sum = 0
    for(let i =0; i < todayReturn.length ; i++){
       sum += parseFloat(todayReturn[i].price)
    } 
    res.status(200).json(sum);
    }) 
 
})

//count  total returns by date 
router.get("/countTotalByDate" ,async(req,res, next) =>{
  var startDate =  req.query.date;
  let fromDate = new Date(startDate);
  fromDate.setHours(0,0,0,0);
  var toDate = new Date(startDate)
  toDate.setHours(23,59,59,999);
  Returns.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(returns => {
    todayReturns = returns
    let sum = 0
    for(let i =0; i < todayReturns.length ; i++){
      sum += todayReturns[i].price
    } res.status(200).json(sum);
    }) 
})

//get  returns by date 
router.get("/byDate" ,async (req, res, next) => {
  var startDate =  req.query.startDate;
  let startTest = new Date(startDate);
  startTest.setHours(0,0,0,0);
  var endTest = new Date(startDate)
  endTest.setHours(23,59,59,999);
  Returns.find({created_at: {$gte: startTest , $lt: endTest}})
  .then(returns => {
    if (returns){
      res.status(200).json(returns);
    }else{
      res.status(404).json({message: "returns not found"});
    }
  }) 
})


module.exports = router;
