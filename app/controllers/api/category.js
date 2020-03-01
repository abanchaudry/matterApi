const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Category, validate } = require('../../models/category');

const express = require('express');
const router = express.Router();

// route to add new category
router.post("/addNew",  async (req, res, next) => { 
  const category = new Category(req.body);
  category.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New values Saved successful!" });
    }else{
      res.status(404).json({success: false, message: "values Not saved!" });
    }    
  });
});

// route to add new sub cat
router.post("/addSubCat",  async (req, res, next) => { 
  console.log("in subcat")
  const categoryId = req.body.name;
  await Category.findOneAndUpdate({_id: categoryId},
    {$push: {      
        subCat: categoryId.toString()
      }
    }
  ) 
});

// route get all categories
router.get('/AllCategories',async (req, res) => {
  Category.find().then(category => {
    if (category){
      res.status(200).json(category);
    }else{
      res.status(404).json({message: "category not found"});
    }
  })  
});



module.exports = router;








