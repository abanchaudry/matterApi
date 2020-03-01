const auth = require('../../../middleware/auth');
const { Bills, validate } = require('../../models/purchaseBills');
const express = require('express');
const router = express.Router();

// route to add new bill
router.post("/addNew" ,async (req, res, next) => { 
  const bill = new Bills(req.body);
    bill.save().then(bill => {
    if(bill){
      res.status(200).json({success: true, bill });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});


//route to get all bills
router.get("/allBills" ,async (req, res, next) => { 
  Bills.find().sort({_id:-1}).then(bills => {
    if (bills){
      res.status(200).json(bills);
    }else{
      res.status(200).json({success:false, message: "Bills not found"});
    }
  }) 
});

//count today total bill sale 
router.get("/todayTotal" ,async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Bills.find({created_at: {$gte: startOfToday}})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < todaySale.length ; i++){
      sum += todaySale[i].receivedAmount
    } res.status(200).json(sum);
    }) 
})

//count  total bill sale of date 
router.get("/countTotalByDate",async(req,res, next) =>{
  var startDate =  req.query.date;
  let fromDate = new Date(startDate);
  fromDate.setHours(0,0,0,0);
  var toDate = new Date(startDate)
  toDate.setHours(23,59,59,999);
  Bills.find({created_at: {$gte: fromDate , $lt: toDate}})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < todaySale.length ; i++){
      sum += todaySale[i].receivedAmount
    } res.status(200).json(sum);
    }) 
})

//today total sub discount of all bills
router.get("/todayExtraDiscount" ,async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Bills.find({created_at: {$gte: startOfToday}})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < todaySale.length ; i++){
      for(let j= 0; j < todaySale[i].sale.length ; j++){
       sum += todaySale[i].sale[j].extraDiscount
     }
      
    } 
    res.status(200).json(sum);
    }) 
 
})

//count today total credit sale
router.get("/todayTotalCreditSale",async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Bills.find({created_at: {$gte: startOfToday} , type : "due"})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < todaySale.length ; i++){
      sum += todaySale[i].receivedAmount
     } 
    res.status(200).json(sum);
    }) 

})

//count  total credit sale of date
router.get("/totalDueSaleOfDate",async(req,res, next) =>{
  var startDate =  req.query.date;
  let fromDate = new Date(startDate);
  fromDate.setHours(0,0,0,0);
  var toDate = new Date(startDate)
  toDate.setHours(23,59,59,999);
  Bills.find({created_at: {$gte: fromDate , $lt: toDate} , type : "due"})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < todaySale.length ; i++){
      sum += todaySale[i].receivedAmount
     } 
    res.status(200).json(sum);
    }) 

})
// route to get all due bills
router.get("/allBills/due",async (req, res, next) => { 
  dueSale = []
  Bills.find().sort({_id:-1}).then(bills => {
    for(let i =0 ;i < bills.length ;i++){
      if(bills[i].type == "due"){
        dueSale.push(bills[i])
      }
    }
    if (dueSale){
      res.status(200).json(dueSale);
    }else{
      res.status(200).json({success:false ,message: "due sale not found"});
    }
  }) 
});


router.get("/todayBills" ,async (req, res, next) => { 
  var start = new Date();
  var end = new Date();
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Bills.find({created_at: {$gte: startOfToday}})
  .then(bills => {
    if (bills){
      res.status(200).json(bills);
    }else{
      res.status(404).json({message: "bills not found"});
    }
  }) 
})

// route to get and count  user due amount 
// router.get("/countTotal/:id",  async (req, res, next) => { 
//   let totalPending = 0
//    await Credits.find({crediterId:req.params.id}).then(userCredits => {
//         for(let j=0 ; j < userCredits.length ; j++){
//           totalPending += userCredits[j].pendingAmount
//         }
//       if (userCredits){
//         res.status(200).json(totalPending);
//       }else{
//         res.status(404).json({message: "not found"});
//       }
//    }) 
//   // console.log("user length" + userCredits.length)
//       // for(let i =0 ;i < userCredits.length ; i++){
//       //  totalPending += userCredits[i].pendingAmount 
//       // }
//       // console.log("total pending" + totalPending)
  
//   // Credits.find().sort({_id:-1}).then(credits => {
//   //   for(let i =0 ;i < credits.length ;i++){
//   //     for(let j=0 ; j < credits[i].sale.length ; j++){
//   //       creditSale.push(credits[i].sale[j])
//   //     }
//   //   }
//   //   if (credits){
//   //     res.status(200).json(creditSale);
//   //   }else{
//   //     res.status(404).json({message: "credits not found"});
//   //   }
// //  }) 
// });


// route to get user credits bill
// router.get("/:id",  async (req, res, next) => { 
//    await Credits.find({crediterId:req.params.id}).then(credits => {
//       if (credits){
//         res.status(200).json(credits);
//       }else{
//         res.status(404).json({message: "not found"});
//       }
//    }) 
//   // console.log("user length" + userCredits.length)
//       // for(let i =0 ;i < userCredits.length ; i++){
//       //  totalPending += userCredits[i].pendingAmount 
//       // }
//       // console.log("total pending" + totalPending)
  
//   // Credits.find().sort({_id:-1}).then(credits => {
//   //   for(let i =0 ;i < credits.length ;i++){
//   //     for(let j=0 ; j < credits[i].sale.length ; j++){
//   //       creditSale.push(credits[i].sale[j])
//   //     }
//   //   }
//   //   if (credits){
//   //     res.status(200).json(creditSale);
//   //   }else{
//   //     res.status(404).json({message: "credits not found"});
//   //   }
// //  }) 
// });

//get by date
// router.get("/byDate",  async (req, res, next) => {
//   creditSale = []
//   var startDate =  req.query.startDate;
//   let startTest = new Date(startDate);
//   startTest.setHours(0,0,0,0);
//   var endTest = new Date(startDate)
//   endTest.setHours(23,59,59,999);
//   Credits.find({created_at: {$gte: startTest , $lt: endTest}}).sort({_id:-1}).then(credits => {
//     for(let i =0 ;i < credits.length ;i++){
//       for(let j=0 ; j < credits[i].sale.length ; j++){
//         creditSale.push(credits[i].sale[j])
//       }
//     }
//     if (credits){
//       res.status(200).json(creditSale);
//     }else{
//       res.status(404).json({message: "credits not found"});
//     }
//   }) 
//   // Credits.find({created_at: {$gte: startTest , $lt: endTest}})
//   // .then(sale => {
//   //   if (sale){
//   //     res.status(200).json(sale);
//   //   }else{
//   //     res.status(404).json({message: "sale not found"});
//   //   }
//   // }) 
// })

module.exports = router;
