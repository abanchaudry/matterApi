const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Price, validate } = require('../../models/price');

const express = require('express');
const router = express.Router();

// route to add new accountinto database 
router.post("/addnew",  async(req, res, next) => { 
  const account= new Account(req.body);
  account.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New values Saved successful!" });
    }else{
      res.status(404).json({success: false, message: "values Not saved!" });
    }    
  });
});

// route to update the account
router.put("/ByUser", async(req, res, next) => {  
  Account.findOne({user_id: req.query.userId}).then(account=> {
    if (account){
      req.body.balance += account.balance
      req.body.updated_at = Date.now()
      account.updateOne(req.body).then(result => {
        if(result){
          res.status(200).json({success: true, message: "values Update successful!" });
        }else{
          res.status(404).json({success: false, message: "values Not Updated!" });
        }        
      });
    }else{
      res.status(404).json({message: "accoun tnot found"});
    }
  })
 
 
});

// route to update customer pending balance
router.put("/updateBalance", async(req, res, next) => {  
  Account.findOne({_id: req.query.userId}).then(account=> {
    if (account){
      req.body.balance = account.balance - req.body.balance
      req.body.updated_at = Date.now()
      account.updateOne(req.body).then(result => {
        if(result){
          res.status(200).json({success: true, message: "After Transfer Balance value Updated successful!" });
        }else{
          res.status(404).json({success: false, message: "After Transfer Balance value Not Updated!" });
        }        
      });
    }else{
      res.status(404).json({message: "accountnot found"});
    }
  }) 
});

// route to delete the Account value by id
router.delete("/:id", async(req, res, next) => {     
  Account.findByIdAndRemove({_id: req.params.id}).then(result => {
    if(result){
      res.status(200).json({success: true, message: "values removed successful!" });
    }else{
      res.status(404).json({success: false, message: "values Not removed!" });
    }
  });
});

// route get all accounts
router.get('/All', async (req, res) => {
  Price.find().then(price => {
    if (price){
      res.status(200).json(price);
    }else{
      res.status(404).json({message: "price not found"});
    }
  })
  
});

// route to get Account using User Id
router.get("/ByUser", async(req, res, next) => {
  console.log("in function")
  Account.findOne({user_id: req.query.userId}).then(account=> {
    if (account) {
      console.log("available")
      res.status(200).json(account);
    } else {
      console.log("not available")
      res.status(404).json({success: false, message: "Account Not Found!" });;
    }
  });
}); 



// route tp get Account using Account Id
router.get("/:id", async(req, res, next) => {
  Account.findById(req.params.id).then(account=> {
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "account not found!" });
    }
  });
}); 

module.exports = router;








