const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Orders, validate } = require('../../models/order');


const express = require('express');
const router = express.Router();

// route to add new sale 
router.post("/addNew" ,async (req, res, next) => { 
  const order = new Orders(req.body);
    order.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Order Saved Successful!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});

//route to get all orders
router.get("/allOrders",  async (req, res, next) => { 
  Orders.find().then(orders => {
    if (orders){
      res.status(200).json(orders);
    }else{
      res.status(404).json({message: "Order not found"});
    }
  }) 
});


//route to get order with billNO
router.get("/orderByBillNo",  async (req, res, next) => { 
  let billNo = req.query.billNo
  Orders.findOne({billNo:billNo}).then(orders => {
    if (orders){
      res.status(200).json(orders);
    }else{
      res.status(404).json({message: "Order not found"});
    }
  }) 
});


// route to add new schedule
router.post("/addNewSchedule",  async (req, res, next) => { 
  const orderId = req.body.orderId;
  await Orders.findOneAndUpdate({_id: orderId},
    {$push: {      
        scheduleChange: req.body
      }
    }
  ).then(
    res.status(200).json({success :true , message : "schedule update successfully"})
  )
});

//route to get all pending orders
router.get("/allPendingOrders",  async (req, res, next) => { 
  Orders.find({status: 'pending'}).then(orders => {
    if (orders){
      res.status(200).json(orders);
    }else{
      res.status(404).json({message: "Order not found"});
    }
  }) 
});

//route to update order status
router.put("/updateOrderStatus",  async (req, res, next) => { 
  let id = req.body._id
  let status = req.body.status
  Orders.updateOne({_id: id} , {$set : { 'status' :status}},function(err) {
    // if (err) throw err;  
    //   // respons to the front end
      res.json({ success: true, message: 'Status Updated Successfully!'});
   })
});

//route to get exclusion change
//count today total bill sale 
router.get("/todayExclusionChange",async(req,res, next) =>{
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Orders.find({exclusion_update: {$gte: startOfToday}}).then(orders => {
    if (orders){
      res.status(200).json(orders);
    }else{
      res.status(404).json({message: "Order not found"});
    }
  }) 
  
})
//route to get all orders
router.get("/customerOrder",  async (req, res, next) => { 
  let email =  req.query.email
  Orders.find({customerEmail: email},).then(orders => {
    if (orders){
      res.status(200).json(orders);
    }else{
      res.status(404).json({message: "Order not found"});
    }
  }) 
});


//route to update exclusions
router.put("/updateExclusions",  async (req, res, next) => { 
  const orderId = req.body.orderId;
  const order = await Orders.findOne({_id:orderId});
  var exclusion = req.body.exclusions;
  let updated_at = Date.now()
  let exclusion_update = Date.now()

  await Orders.updateOne({_id: orderId} , {$set : { 'exclusions' : exclusion,'exclusion_update' : exclusion_update  ,'updated_at' : updated_at}},function(err) {
   if (err) throw err;  
   //   // respons to the front end
     res.json({ success: true, message: 'your changes are Updated successfully!'});
  })
 });
  

module.exports = router;








