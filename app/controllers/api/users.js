const _ = require('lodash');
require('dotenv').config();
const mail = require('../../../middleware/emailManager');
const { User, validate } = require('../../models/user');
const Encrypt = require('../../../middleware/Encrypt&Decrypt');
const auth = require('../../../middleware/auth');


const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const router = express.Router();


// route to save new company
router.post("/register",  async (req, res, next) => { 
  const user = new User(req.body);
     // to check if package name is already exsist
     let usr = await User.findOne({ customerEmail: req.body.customerEmail});
     if (usr) return res.json({ success: false, message: 'Email Already Exists' });

      text = `<h2> Please Verify Your Order  </h2>
       click on the link below.
        `
    id = user._id.toString();
    var user_id = await Encrypt.encrypt(id);
    // url = `${process.env.RegisterUser_url}verfiyUser=${user_id}`
    url = `http://localhost:4200/?verfiyUser=${user_id}`
    var values = {
      url: url,
      val: req.body.customerEmail,
      user: '',
      userEmail: '',
      text: text,
      organisation: '',
      button: 'Register'
      }    
      await mail.sendEmail(values).then(data => {
        // console.log("Result OK:", data);
        }).catch(err => {
          // console.log("Result err:", err)
          // user.remove();
          res.json({success : false, message: 'Email Not sent user not Registered please try again'});
        })
       
  user.save().then(result => {
    if(result){
      res.status(200).json({success: true, message: "Email sent to your account please verify your email!" });
    }else{
      res.status(200).json({success: false, message: "User Not saved Please Try Again!" });
    }    
  });
});


// router.post('/register', async (req, res) => {  

//   // to check the validation on the requested fields
//   const { error } = validate(req.body);
//   if (error) return res.json({ success: false, message: (error)});
//   // to check if the user is already registered
//   let user = await User.findOne({ customerEmail: req.body.customerEmail });
//   if (user) return res.json({ success: false, message: 'User email already exists' });
 
//   // counting the total users and adding number in the name
//   // user_no = await User.countDocuments();
//   user = new User(_.pick(req.body, [ 'customerEmail', 'password' ]));
//   await user.save();
//   //sending the email to the new register user to verify its account with user id
//   // role = req.body.role;
  
//   // id =user._id.toString();
//   // var user_id = await Encrypt.encrypt(id);
//         res.json({ success: true, 
//         message: 'Thanks for registering your details. Please wait for approvel”'
//       })  
     
// });


// Register a new user
// router.post('/register', async (req, res) => {  
//   // to check the validation on the requested fields
//   const { error } = validate(req.body);
//   if (error) return res.json({ success: false, message: (error)});
//   // to check if the user is already registered
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.json({ success: false, message: 'User Email Already Exists' });
 
//   // counting the total users and adding number in the name
//   user_no = await User.countDocuments();
//   user = new User(_.pick(req.body, ['name','email', 'password','role','contact']));
//   user.username = `Amjad Paint House ${user_no}`;
//   await user.save();
//    res.json({ success: true, 
//       user_id: user._id,
//       message: 'Thanks For Register Your Detail Please Wait For Activation of your account.”'
//     })  
     
// });

// user password change

router.put('/changePassword/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.json({ success: false, message: 'User not Registered' });
  var password = req.body.password
  password = bcrypt.hashSync(password, saltRounds);
	await user.updateOne(
    {$set: 
      {
        password: password,
        updated_at: Date.now(),
      }
    }
  )
  res.json({ success: true, message: 'your password is Reset successful!'});
});

// Activate User 

router.put('/activeUser/:id',auth, async (req, res) => {
  console.log("update user call")
  const user = await User.findByIdAndUpdate((req.params.id),
    {isActive: true
  });
  
  res.json({ success: true, message: 'user is Activa'});
});

// DeActivate User 

router.put('/deActiveUser/:id',auth, async (req, res) => {
  console.log("update user call")
  const user = await User.findByIdAndUpdate((req.params.id),
    {isActive: false
  });
  
  res.json({ success: true, message: 'user is DeActiva'});
});


// update  current user

router.put('/:id',auth, async (req, res) => {
  // check the validation of user fields 
  const { error } = validate(req.body);
  if (error) return res.json({ success: false, message: (error)});
  var newvalues =  {
    username: req.body.name,
    email: req.body.email, 
    password: req.body.password,
    updated_at: Date.now(),
  };
	await User.updateOne( {_id: req.params.id},newvalues, function(err) {
    if (err) throw err;  
    // respons to the front end
    res.json({ success: true, message: 'your changes are Updated successfully!'});
  });
});



// change the isDeleted field to true 

router.delete('/:id',auth, async (req, res) => {
 	const user = await User.findByIdAndUpdate((req.params.id),
    {isDeleted: true
  });
  
  res.json({ success: true, message: 'user is Removed'});
});


//create new password from verify link
router.post('/checkVerifyId' ,async(req,res) =>{
  console.log("function hit")
  var idofUser = req.body.verifyUser;
  if(idofUser.toString() != null && idofUser.toString() != '' ) {
    userId = await Encrypt.decrypt(idofUser)
    const user = await User.findOne({_id:userId})
    if(user){
      res.json(user);
    } else{
      res.json({ success: false, message: 'no user found'});
    }
  }
})

// user login verification
router.post('/login', async (req, res) => {
  // check if user come using the email verification link
  var idofUser = req.body.verifyUser;
  if(idofUser.toString() != null && idofUser.toString() != '' ) {
    userId = await Encrypt.decrypt(idofUser)
    const user = await User.updateOne( {_id: userId},
      {$set: {
        "isVerified": true,        }
      }
    )
    // console.log(user)
  }
  // user login checks  
  const user = await User.findOne({ customerEmail: req.body.email });
  if (!user) return res.json({ success: false, message: 'Invalid Email Address.'});
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) return res.json({ success: false, message: 'Invalid password.'});
  // if (user.isActive == false ) return res.json({ success: false, message: 'User Is Not Active'});
  if (user.isDeleted == true ) return res.json({ success: false, message: 'User is Removed'});  
 
  // generate token for user
  const token = user.generateAuthToken();
  // update the user last login date
  user.updateOne(
    {$set: {
      "lastLoginDate": Date.now(),           
    },function(error) {
      return error
    }
  });  
  // response to the front end
  res.status(200).json({
    success: true,
    token: token
  });
});

// to send the reset password email
router.post('/forget', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, message: 'Requested Email Address Is Not Registered.'});
  emi = req.body.email;
  name = user.username;
  text =`<h2> Password Reset Mail  </h2> </b>A password change request for your account ${emi} was requested.Click on the following link to 
  confirm your request and create a new password.
  Please note that this link will expire after 2 hours from the time it was sent. If you did not request 
  a password reset then please ignore this message.
    ` 
  const token = user.generateAuthToken();
  url = `${process.env.RestPassword_url}changepassword=${token}`
 
  var values = {
    url: url,
    val: req.body.email,
    user: '',
    userEmail: '',
    text: text,
    organisation: '',
    button: 'Rest Password'
    }    
    await mail.sendEmail(values).then(data => {
      // console.log("Result OK:", data); 
      }).catch(error => {
        // console.log("Result err:", err)
        user.remove();
        res.json({success : false, message: 'Email Not sent user not Registered please try again'});
      })
  
  res.json({ success: true, message: 'Reset Password Email has Been Sent please check your email and rest your password' });
});

// to get the user with user email
router.get('/ByEmail', async (req, res) => {
  const user = await User.findOne(req.query.email);
  if (user.isDeleted == true ) return res.json({ 
    success: false, 
    message: 'User Removed'
  });
  res.status(200).json(user);

});

// route get all Users
router.get('/AllUsers', async (req, res) => {
  User.find().then(users=> {
    if (users){
      res.status(200).json(users);
    }else{
      res.status(404).json({message: "user not found"});
    }
  })
  
});

// to get the user with user id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user.isDeleted == true ) return res.json({ 
    success: false, 
    message: 'User Removed'
  });
  res.status(200).json(user);
});



module.exports = router;
