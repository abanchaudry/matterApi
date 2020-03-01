const auth = require('../../../middleware/auth');
const { Customer, validate } = require('../../models/customers');
const express = require('express');
const router = express.Router();

router.post('/create', async (req, res) => {  
  // to check the validation on the requested fields
  // const { error } = validate(req.body);
  // if (error) return res.json({ success: false, message: (error)});
  // to check if the user is already registered
  const customer = new Customer(req.body);
  let name = await Customer.findOne({ name: req.body.name });
  if (name) return res.json({ success: false, message: 'User Name already exists please create with another name' });
 
  // customer = new Customer(_.pick(req.body, ['name', 'reference', "contact", 'detail']));
  await customer.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Account Created Successfully!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});

// route get all Customer
router.get('/AllCustomer' ,async (req, res) => {
  Customer.find().then(customers=> {
    if (customers){
      res.status(200).json(customers);
    }else{
      res.status(200).json({success:false ,message: "customers not found"});
    }
  })
  
});


//router to subsctract customer balance
router.put('/receivedBlance/:id',async (req, res) => {
  let customer = await Customer.findOne({ _id: req.params.id});
  await Customer.findOneAndUpdate({_id: req.params.id},
    {$push: {      
        received: req.body
      }
    }
  )
  let previousTotal = customer.pendingAmount
  let  newAmount = req.body.amount
  let newTotal = previousTotal - newAmount
  let updated_at = Date.now()

 await Customer.updateOne({_id: req.params.id} , {$set : { 'pendingAmount' : newTotal , 'updated_at' : updated_at}},function(err) {
  if (err) throw err;  
  //   // respons to the front end
    res.json({ success: true, message: 'Amount Add successfully!'});
 })
});

//get today due received
router.get("/todayDueReceived" ,async (req, res, next) => {
  let fromDate = new Date();
  fromDate.setHours(0,0,0,0);
  var toDate = new Date()
  toDate.setHours(23,59,59,999);
  let sum = 0;
   Customer.find().then(customers=> {
    for(let i =0; i < customers.length ; i++){
      for (let index = 0; index < customers[i].received.length; index++) {
        var newDate = new Date(customers[i].received[index].date);
        if(newDate >= fromDate){
          sum += Number(customers[i].received[index].amount)
        }
      }
    }
    res.status(200).json(sum);
  });
})

//count due received of date
router.get("/totalDueReceivedByDate",async (req, res, next) => {
  let fromDate =new Date(req.query.date)
  fromDate.setHours(0,0,0,0);
  var toDate = new Date()
  toDate.setHours(23,59,59,999);
  let sum = 0;
   Customer.find().then(customers=> {
    for(let i =0; i < customers.length ; i++){
      for (let index = 0; index < customers[i].received.length; index++) {
        var newDate = new Date(customers[i].received[index].date);
        if(newDate >= fromDate){
          sum += Number(customers[i].received[index].amount)
        }
      }
    }
    res.status(200).json(sum);
  });
})



// to get the customer with  id
router.get("/:id" ,async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer){
    res.status(200).json(customer);
  }else{
    res.status(200).json({success:false ,message: "customer not found"});
  }
});

//router to update user total balance
router.put('/updateBlance/:id', async (req, res) => {
  let customer = await Customer.findOne({ _id: req.params.id});
  let previousTotal = customer.pendingAmount
  let  newAmount = req.body.amount
  let newTotal = previousTotal + newAmount
  let updated_at = Date.now()

 await Customer.updateOne({_id: req.params.id} , {$set : { 'pendingAmount' : newTotal , 'updated_at' : updated_at}},function(err) {
  if (err) throw err;  
  //   // respons to the front end
    res.json({ success: true, message: 'Amount Add successfully!'});
 })
});





module.exports = router;
