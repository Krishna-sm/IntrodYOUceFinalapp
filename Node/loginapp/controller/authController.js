const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const User = require('../model/UserSchema');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//list all users 
router.get('/users',(req, res) => {
    User.find({},(err,user)=>
    {
           if(err) throw err;
           res.send(user);
          
    })
})

//register user

router.post('/register',(req, res) => {
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User'
    },(err,result)=>{
        res.status(200).send('Registration successfully done')
    })
})

router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({auth:false,token:'There is a problem while logging you in'});
        if(!user) return res.status(500).send({auth:false,token:'No user found with given email address'});
        else {
            const passIsvalid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsvalid) return res.status(201).send({auth:false,token:'Invalid Password'});
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})
            return res.status(200).send({auth:true,token});
        }
    });
  
})

router.get('/userInfo',(req,res) =>{
    let token = req.headers['x-access-token'];
    if(!token) return res.status(201).send({auth:false,token:'No token provided'});
    jwt.verify(token,config.secret,(err,data) =>{
        if(err) return res.status(201).send({auth:false,token:'Invalid token'});
        User.findById(data.id,(err,user) =>{
            res.send(user)
        })
    })
})
module.exports = router;