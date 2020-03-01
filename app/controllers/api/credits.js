const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Credits, validate } = require('../../models/credits');

const express = require('express');
const router = express.Router();

// route to add new sale 
router.post("/addNew",  async (req, res, next) => { 
  const credit = new Credits(req.body);
    credit.save().then(result => {
    if(result){
      res.status(200).json({success: true, credit });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});

// route to get all credits
router.get("/allCredits",  async (req, res, next) => { 
  Credits.find().sort({_id:-1}).then(credits => {
    if (credits){
      res.status(200).json(credits);
    }else{
      res.status(404).json({message: "credits not found"});
    }
  }) 
});

// route to get all credits
router.get("/allCredits/sale", async (req, res, next) => { 
  creditSale = []
  Credits.find().sort({_id:-1}).then(credits => {
    for(let i =0 ;i < credits.length ;i++){
      for(let j=0 ; j < credits[i].sale.length ; j++){
        creditSale.push(credits[i].sale[j])
      }
    }
    if (credits){
      res.status(200).json(creditSale);
    }else{
      res.status(404).json({message: "credits not found"});
    }
  }) 
});

// route to get and count  user due amount 
router.get("/countTotal/:id",  async (req, res, next) => { 
  let totalPending = 0
   await Credits.find({crediterId:req.params.id}).then(userCredits => {
        for(let j=0 ; j < userCredits.length ; j++){
          totalPending += userCredits[j].pendingAmount
        }
      if (userCredits){
        res.status(200).json(totalPending);
      }else{
        res.status(404).json({message: "not found"});
      }
   }) 
});


// route to get user credits bill
router.get("/:id",  async (req, res, next) => { 
   await Credits.find({crediterId:req.params.id}).then(credits => {
      if (credits){
        res.status(200).json(credits);
      }else{
        res.status(404).json({message: "not found"});
      }
   }) 

});

//get by date
router.get("/byDate" ,async (req, res, next) => {
  creditSale = []
  var startDate =  req.query.startDate;
  let startTest = new Date(startDate);
  startTest.setHours(0,0,0,0);
  var endTest = new Date(startDate)
  endTest.setHours(23,59,59,999);
  Credits.find({created_at: {$gte: startTest , $lt: endTest}}).sort({_id:-1}).then(credits => {
    for(let i =0 ;i < credits.length ;i++){
      for(let j=0 ; j < credits[i].sale.length ; j++){
        creditSale.push(credits[i].sale[j])
      }
    }
    if (credits){
      res.status(200).json(creditSale);
    }else{
      res.status(404).json({message: "credits not found"});
    }
  }) 
})

module.exports = router;








