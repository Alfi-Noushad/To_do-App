const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../model/User');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "lovesnotso$ba&d";


//ROUTE 1: Creating the User ----> POST "/api/auth/register"

router.post('/register', async (req,res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt(password,10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.json({message: "User has been registered"});
});


//ROUTE 2: Login the created acc -----> 

router.post('/login', async (req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message: "invalid credentials"})
    }
    const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn: '1h'});
    res.json({token});

});


module.exports = router;