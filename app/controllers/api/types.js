const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Type , validate } = require('../../models/types');

const express = require('express');
const router = express.Router();

// route to add new sendTransferinto database 
router.post("/addNew",  async (req, res, next) => { 
  const type = new Type(req.body);
   // to check if the type is already registered
   let typ = await Type.findOne({ name: req.body.name});
   if (typ) return res.json({ success: false, message: 'Type already exists' });
  type.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Type Save successful!" });
    }else{
      res.status(200).json({success: false, message: "values Not save Pleae Try Later!" });
    }    
  });
});


// route to add new size 
router.post("/addNewSize",async (req, res, next) => { 
  const type_id = req.body.type;
  if(!type_id){
    return
  }
  const sizes = req.body.sizes
  await Type.findOneAndUpdate({_id: type_id},
    {$push: {      
        sizes: sizes
      }
    }
  ).then(result => {
    if(result){
    res.status(200).json({success: true, message: "Size Added Successful!" });
    }else{
    res.status(404).json({success: false, message: "values Not Add Please Try Later" });
    }
    
    });
});

// route get all categories
router.get('/AllTypes' ,async (req, res) => {
  Type.find().then(type => {
    if (type){
      res.status(200).json(type);
    }else{
      res.status(200).json({message: "Type Not Found"});
    }
  })  
});

// route to update the sendTransfer
router.put("/:id" ,async (req, res, next) => {  
  const sendTransfer=  SendTransfer.findOne({_id: req.params.id});
  req.body.updated_at = Date.now()
  sendTransfer.updateOne(req.body).then(result => {
    if(result){
      res.status(200).json({success: true, message: "values Update successful!" });
    }else{
      res.status(404).json({success: false, message: "values Not Updated!" });
    }
    
  });
});

// route to delete the SendTransfervalue by id
router.delete("/:id" ,async (req, res, next) => {     
  SendTransfer.findByIdAndRemove({_id: req.params.id}).then(result => {
    if(result){
      res.status(200).json({success: true, message: "values removed successful!" });
    }else{
      res.status(404).json({success: false, message: "values Not removed!" });
    }
  });
});





module.exports = router;








