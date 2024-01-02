const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "pA*88dfjwe0(ruYRWc9WNnskfhwe8f"

router.post("/register", async(req,res)=>{
    const newMember = new User({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone, password: req.body.password, isRegisteredMember: true});
    try {
        const user = await newMember.save();
        res.send("Member Registered Successfully")
        
    }catch(error){
            return res.status(400).json({error});
    }
});
router.post("/create-user", async(req,res)=>{
    const newUser = new User({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone});
    try {
        const user = await newUser.save();
        res.send("Create User Successfully")
        
    }catch(error){
            return res.status(400).json({error});
    }
});
router.post("/login", async(req,res)=>{
    const {email, password} = req.body
    try {
        // const user = await User.findOne({email: email, password: password});
        // if (user){
        //     res.send("Member Login Successfully")}
        // else  {
        //     return res.status(400).json({message: "login fail"});

        // }   
        const user = await User.findOne({email})
        if(!user){
          return res.status(400).send({
            success: false,
            message: "user not found"
          })
        }
        if((password == user.password)){
            const token = await jwt.sign({email: user.email}, JWT_SECRET)
            return res.send({
              success: true,
              message: "login successfully",
              token: token,
              user: user
            })
        } else {
          return res.send({success: false, message: "incorrect password"})
        }
    }catch(error){
            return res.status(500).send({
                success: false,
                error: error,
                message: error.message

            });
    }
});

router.post('/check', (req, res) => {
    // Check if a user already exists
    User.findOne({ email: req.body.email })
      .then(user => res.json({ exists: !!user }))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.put('/:email', (req, res) => {
    // Update an existing user
    User.findOneAndUpdate({ email: req.params.email }, req.body)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router
  