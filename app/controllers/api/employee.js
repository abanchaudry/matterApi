const auth = require('../../../middleware/auth');
const { Employee, validate } = require('../../models/employee');
const express = require('express');
const router = express.Router();

// route to add new bill
router.post("/create" ,async (req, res, next) => { 
  const employee = new Employee(req.body);
    employee.save().then(employee => {
    if(employee){
      res.status(200).json({success: true, message: "Employee Account Created Successfully" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});


// route to get all accounts
router.get("/all" ,async (req, res, next) => { 
      Employee.find().then(employee => {
      if(employee){
        res.status(200).json(employee);
      }else{
        res.status(200).json({success: false, message: "Employees Not Found!" });
      }    
    });
  });


router.get("/totalReceived" , async(req,res,next) =>{
  let totalEmpReceived = 0
  let fromDate = new Date();
  fromDate.setHours(0,0,0,0);
  var toDate = new Date()
  toDate.setHours(23,59,59,999);
  let employees = await Employee.find()
  for(let i =0; i < employees.length; i++){
    for(let j=0; j < employees[i].receivedAmount.length ; j++){

      if(new Date(employees[i].receivedAmount[j].date) > fromDate && new Date(employees[i].receivedAmount[j].date) < toDate){
        totalEmpReceived +=  Number(employees[i].receivedAmount[j].amount)
      }

    }
  }
  res.status(200).json(totalEmpReceived);
})  

  // route to deposit amount to employee
router.post("/depositAmount" ,async (req, res, next) => { 
    let employee = await Employee.findOne({ name: req.body.name});
    console.log(employee)
    await Employee.findOneAndUpdate({name: req.body.name},
      {$push: {      
          receivedAmount: req.body
        }
      })

    res.status(200).json({success: true, message: "Amount Deposit Successfully!" });

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


