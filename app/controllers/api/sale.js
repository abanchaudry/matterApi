const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Sale, validate } = require('../../models/sale');
// var moment = require('moment');
const express = require('express');
const router = express.Router();


// route to add new sale 
router.post("/addNew",async (req, res, next) => { 
  const sale = new Sale(req.body);
    sale.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Sale Saved Successful!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});

// route to get all sales
router.get("/allSales" ,async (req, res, next) => { 
  Sale.find().sort({_id:-1}).then(sale => {
    if (sale){
      res.status(200).json(sale);
    }else{
      res.status(404).json({message: "sale not found"});
    }
  }) 
});

//route to find sale by bill no
router.get("/saleByBill" ,async(req,res,next)=>{
  let sale = await Sale.find({ bill_no: req.query.billNo}).then(sale => {
    if (sale){
      res.status(200).json(sale);
    }else{
      res.status(404).json({message: "sale not found"});
    }
  }) 
})

router.get("/today",async (req,res,next) =>{
  console.log("in today")
  // var start = new Date();
  // start.setHours(0,0,0,0);

  // var end = new Date();
  // end.setHours(23,59,59,999);
  // var start = moment().startOf('day'); // set to 12:00 am today
  // var end = moment().endOf('day'); // set to 23:59 pm today
  console.log("start" + start)
  console.log("end" + end)
//   Sale.find({created_on: {$gte: start, $lt: end}}).then(sale => {
//     if (sale){
//       res.status(200).json(sale);
//     }else{
//       res.status(200).json({message: "sale not found"});
//     }

// });
});

router.get("/todayTotal" ,async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Sale.find({created_at: {$gte: startOfToday}})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < sale.length ; i++){
      sum += sale[i].sale.afterDiscountTotal
    } res.status(200).json(sum);
    }) 
})

//today total sub discount
router.get("/todayExtraDiscount" ,async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Sale.find({created_at: {$gte: startOfToday}})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < todaySale.length ; i++){
      sum += todaySale[i].sale.extraDiscount
    } 
    res.status(200).json(sum);
    }) 
 
})
router.get("/todayTotalCrediSale",async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Sale.find({created_at: {$gte: startOfToday} , type : "due"})
  .then(sale => {
    todaySale = sale
    let sum =0
    for(let i =0; i < sale.length ; i++){
      sum += sale[i].sale.afterDiscountTotal
    } res.status(200).json(sum);
    }) 
})


router.get("/todaySales" ,async (req, res, next) => { 
  var start = new Date();
  var end = new Date();
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Sale.find({created_at: {$gte: startOfToday}})
  .then(sale => {
    if (sale){
      res.status(200).json(sale);
    }else{
      res.status(404).json({message: "sale not found"});
    }
  }) 
})


// route to get SendTransferusing User Id
router.get("/ByDates" ,async (req, res, next) => {
  // console.log(req.query)
  Call.ExecuteQuery(req.query).then(result => {
    if(result){
      res.status(200).json({success: true, result });
    }else{
      res.status(200).json({success: false, message: "Values Not Found!" });
    }    
  });
}); 

// router.get("/byDate" ,async(req,res,next) =>{
//   console.log("in date fun")
// var yesterdayStart = new Date();
// yesterdayStart.setDate(yesterdayStart.getDate() - 1);
// // yesterdayStart.setHours(0,0,0,0);
// // var startId = Math.floor(yesterdayStart.getTime() / 1000).toString(16) + "0000000000000000";

// var yesterdayEnd = new Date();
// // yesterdayEnd.setDate(yesterdayEnd.getDate());
// // yesterdayEnd.setHours(23,59,59,999);
// // var endId = Math.floor(yesterdayEnd.getTime() / 1000).toString(16) + "0000000000000000";
//   Sale.find({created_at: {$gte: yesterdayStart , $lte: yesterdayEnd}})
//   .then(sale => {
//     if (sale){
//       res.status(200).json(sale);
//     }else{
//       res.status(404).json({message: "sale not found"});
//     }
//   }) 
 
//     // Sale.find( { _id: { 
//     //                 $gte: ObjectId(startId),
//     //                 $lte: ObjectId(endId)
//     //               } 
//     //        }
//     // );
//     console.log("sale" + sale)
// })
router.get("/byDate" ,async (req, res, next) => {
  var startDate =  req.query.startDate;
  let startTest = new Date(startDate);
  startTest.setHours(0,0,0,0);
  var endTest = new Date(startDate)
  endTest.setHours(23,59,59,999);
  Sale.find({created_at: {$gte: startTest , $lt: endTest}})
  .then(sale => {
    if (sale){
      res.status(200).json(sale);
    }else{
      res.status(404).json({message: "sale not found"});
    }
  }) 
})




// route to get today sales
// router.get("/todaySalesss",  async (req, res, next) => { 
//   console.log("in today sale")
//   Sale.find( { $where: function() { 
//     today = new Date(); //
//     today.setHours(0,0,0,0);
//     return (this._id.getTimestamp() >= today)
// }

// .then(sale => {
//   if (sale){
//     res.status(200).json(sale);
//   }else{
//     res.status(404).json({message: "sale not found"});
//   }
// }) 
//  });
// //  console.log("today sale" + sale)
//   // Sale.find().sort({_id:-1})
//   // todaSales = []
//   // .then(sale => {
//   //   if (sale){
//   //     res.status(200).json(sale);
//   //   }else{
//   //     res.status(404).json({message: "sale not found"});
//   //   }
//   // }) 
// });

module.exports = router;








