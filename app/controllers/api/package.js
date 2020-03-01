const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Package, validate } = require('../../models/package');

const express = require('express');
const router = express.Router();

// route to save new company
router.post("/addNew",  async (req, res, next) => { 
  const package = new Package(req.body);
     // to check if package name is already exsist
     let packg = await Package.findOne({ name: req.body.name});
     if (packg) return res.json({ success: false, message: 'Package Name Already Exists' });
  package.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Package Saved successful!" });
    }else{
      res.status(200).json({success: false, message: "Values Not saved Please Try Again!" });
    }    
  });
});

// route to add new meal plans
router.post("/addMealPlans",  async (req, res, next) => { 
  const packageName = req.body.packageName;
  const meals = req.body.meal
  await Package.findOneAndUpdate({name: packageName},
    {$push: {      
        meals: meals
      }
    }
  ).then(result => {
    if(result){
    res.status(200).json({success: true, message: "Meals Plans Add Successfully!" });
    }else{
    res.status(404).json({success: false, message: "Please Try Later!" });
    }
    
    });
});


// route to add new snacks plans
router.post("/addSnacksInPackage",  async (req, res, next) => { 
  const packageName = req.body.packageName;
  const snacks = req.body.snack
  await Package.findOneAndUpdate({name: packageName},
    {$push: {      
        snacks: snacks
      }
    }
  ).then(result => {
    if(result){
    res.status(200).json({success: true, message: "Snacks Add Successfully!" });
    }else{
    res.status(404).json({success: false, message: "Please Try Later!" });
    }
    
    });
});
// route to add new categories
router.post("/addNewCategories",  async (req, res, next) => { 
  const company_id = req.body.companyName;
  const categories = req.body.categories

  await Company.findOneAndUpdate({_id: company_id},
    {$push: {      
        categories: categories
      }
    }
  ).then(result => {
    if(result){
    res.status(200).json({success: true, message: "values Update successful!" });
    }else{
    res.status(404).json({success: false, message: "values Not Updated!" });
    }
    
    });
});
// route to add new categories
router.put("/updateCat",  async (req, res, next) => { 
  const company_id = req.body.companyid;
  const cat = await Company.findOne({name:company_id});
  var nam = req.body.categoryname;
  const found = cat.categories.findIndex( ({ name }) => name === `${nam}` )
  cat.categories[found].colors_code.push(req.body.codes)
  
  req.body.categories = cat.categories
  cat.updateOne(req.body).then(result => {
  if(result){
  res.status(200).json({success: true, message: "values Update successful!" });
  }else{
  res.status(404).json({success: false, message: "values Not Updated!" });
  }
  
  });
  
  });
// route get all categories
router.get('/allPackages', async (req, res) => {
  Package.find().then(package => {
    if (package){
      res.status(200).json(package);
    }else{
      res.status(404).json({message: "package not found"});
    }
  })  
});


// get packeg detail
router.get('/packageDetail', async (req, res) => {
  let name = req.query.name
  Package.find({name:name}).then(package => {
    if (package){
      res.status(200).json(package);
    }else{
      res.status(404).json({message: "package not found"});
    }
  })  
});
//update package informaiton
router.put('/packageInformation/:id' ,async (req, res) => {
  let updated_at = Date.now()

 await Package.updateOne({_id: req.params.id} , {$set : { 'name' : req.body.name , 'detail' : req.body.detail , 'updated_at' : updated_at}},function(err) {
  // if (err) throw err;  
  //   // respons to the front end
    res.json({ success: true, message: 'your changes are Updated successfully!'});
 })
});

//update package meal inforamtion
router.put('/updatePackageMeal', async (req, res) => {
  let packageName = req.body.packageName
  let planName = req.body.planName
  let fivePrice = req.body.fiveDaysPrice
  let twentyPrice = req.body.twentyDaysPrice
  console.log("package name" +  req.body.packageName)
  console.log("plan name" +  req.body.planName)
  console.log("five days price"  +  req.body.fiveDaysPrice)
  console.log("twenty days price"  +  req.body.twentyDaysPrice)
await  Package.findOneAndUpdate(
    {
      "name": packageName,
      "meals.planName": planName
    },
    {
      "$set" : { "meals.$.fiveDaysPrice" : fivePrice , "meals.$.twentyDaysPrice" : twentyPrice}
    },
    function(err) {
        if (err) throw err;  
          res.json({ success: true, message: 'your changes are updated successfully!'});
       })
// );
  // await Package.updateOne(
  //   {name: packageName, 'meals.planName' : planName} , 
  //   {$set : { 'meals.$.fiveDaysPrice' : fivePrice  }},
  //   function(err) {
  //   if (err) throw err;  
  //     res.json({ success: true, message: 'your changes are updated successfully!'});
  //  })
   console.log("done");
});

module.exports = router;








