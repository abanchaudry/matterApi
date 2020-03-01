const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const { Product, validate } = require('../../models/products');

const express = require('express');
const router = express.Router();

// route to add new product 
router.post("/addNew",  async (req, res, next) => { 
  const product= new Product(req.body);
     // to check if the type is already registered
     let pro = await Product.findOne({ name: req.body.name});
     let size = req.body.size
      if(pro && pro.size == req.body.size){
        return res.json({ success: false, message: 'Product already exists' });
      } 
    product.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "New Product Saved Successful!" });
    }else{
      res.status(200).json({success: false, message: "values Not saved Please Try Later!" });
    }    
  });
});

// route to add new sendTransferinto database 
router.post("/addNewColors",  async (req, res, next) => { 
  const company_id = req.body.companyName;
  const colors = req.body.colors
  await Company.findOneAndUpdate({_id: company_id},
    {$push: {      
        colors: colors
      }
    }.then(result =>{
      res.status(200).json({success: true, message: "New Colors Saved successful!" });
    })
  )
});


// route get all categories
router.get('/AllProducts', async (req, res) => {
  Product.find().then(product => {
    if (product){
      res.status(200).json(product);
    }else{
      res.status(404).json({message: "product not found"});
    }
  })  
});

// route get all stock amount
router.get('/AllProductsAmount',async (req, res) => {
  sum =0
  let products =await Product.find()
  console.log(products.length)
  for(let i =0; i < products.length ; i++){
    sum += products[i].quantity * products[i].price
  }
  console.log(sum)

  res.status(200).json(sum);

});

// route get all out of stock products
router.get('/outOfStock' ,async (req, res) => {
  outStock = []
  let allProducts =await Product.find()
  for(let i =0 ; i < allProducts.length ;i ++){
 
    if(allProducts[i].quantity == 0){
      outStock.push(allProducts[i])
    }
  }
  res.status(200).json(outStock);
})

router.put('/decreaseProduct/:id' ,async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id});
  let previous_quantity = product.quantity
  let sale_quantity = req.body.quantity
  if(sale_quantity > previous_quantity){
    return
  } 
  let new_quantity = previous_quantity - sale_quantity
  let updated_at = Date.now()

 await Product.updateOne({_id: req.params.id} , {$set : { 'quantity' : new_quantity , 'updated_at' : updated_at}},function(err) {
  // if (err) throw err;  
  //   // respons to the front end
    res.json({ success: true, message: 'your changes are Updated successfully!'});
 })
});


router.put('/increaseProduct/:id' ,async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id});
  let previous_quantity = product.quantity
  let return_quantity = req.body.quantity
  let new_quantity = previous_quantity + return_quantity
  let updated_at = Date.now()

 await Product.updateOne({_id: req.params.id} , {$set : { 'quantity' : new_quantity , 'updated_at' : updated_at}},function(err) {
  // if (err) throw err;  
  //   // respons to the front end
    res.json({ success: true, message: 'your changes are Updated successfully!'});
 })
});


// to get product with id
router.get("/:id" ,async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});


router.put('/:id',async (req, res) => {
  // check the validation of user fields 
  // const { error } = validate(req.body);
  // if (error) return res.json({ success: false, message: (error)});
  var newvalues =  {
    name:req.body.name,
    type:req.body.type,
    company:req.body.company,
    category:req.body.category,
    colorCode:req.body.colorCode,
    size:req.body.size,
    quantity:req.body.quantity,
    price:req.body.price,
    updated_at: Date.now(),
  };
	await Product.updateOne( {_id: req.params.id},newvalues, function(err) {
    if (err) throw err;  
    // respons to the front end
    res.json({ success: true, message: 'your changes are Updated successfully!'});
  });
});
module.exports = router;








